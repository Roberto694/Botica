const express = require('express');
const { Op } = require('sequelize');
const { Sale, SaleDetail, Product, InventoryMovement, Customer } = require('../models');
const { authenticate } = require('../middleware/auth.middleware');
const { publishAlert } = require('../services/notification.service');

const router = express.Router();
router.use(authenticate);

router.get('/', async (req, res, next) => {
  try {
    const { search, page = 1, limit = 20 } = req.query;
    const where = {};
    if (search) {
      where[Op.or] = [
        { invoice_number: { [Op.iLike]: `%${search}%` } },
        { payment_method: { [Op.iLike]: `%${search}%` } },
      ];
    }
    const sales = await Sale.findAndCountAll({
      where,
      include: ['customer', { model: SaleDetail, as: 'details', include: ['product'] }],
      order: [['created_at', 'DESC']],
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
    });
    res.json(sales);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { invoice_number, payment_method, payment_status, cashier_name, customer_id, products } = req.body;
    const total = products.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
    const sale = await Sale.create({ invoice_number, payment_method, payment_status, cashier_name, customer_id, total });

    const details = products.map((item) => ({
      sale_id: sale.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      subtotal: item.unit_price * item.quantity,
    }));
    await SaleDetail.bulkCreate(details);
    await Promise.all(products.map(async (item) => {
      const product = await Product.findByPk(item.product_id);
      if (product) {
        product.stock = Math.max(0, product.stock - item.quantity);
        await product.save();
        await InventoryMovement.create({ product_id: product.id, quantity: -item.quantity, type: 'sale', note: `Venta ${sale.invoice_number}` });
        if (product.stock <= product.min_stock) {
          await publishAlert('stock', `Stock bajo para ${product.name}`, { productId: product.id });
        }
      }
    }));
    res.status(201).json({ sale, details });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/cancel', async (req, res, next) => {
  try {
    const sale = await Sale.findByPk(req.params.id, { include: ['details'] });
    if (!sale) return res.status(404).json({ message: 'Venta no encontrada' });
    if (sale.status === 'cancelled') return res.status(400).json({ message: 'Venta ya cancelada' });
    sale.status = 'cancelled';
    await sale.save();
    await Promise.all(sale.details.map(async (item) => {
      const product = await Product.findByPk(item.product_id);
      if (product) {
        product.stock += item.quantity;
        await product.save();
        await InventoryMovement.create({ product_id: product.id, quantity: item.quantity, type: 'return', note: `Cancelación venta ${sale.invoice_number}` });
      }
    }));
    res.json({ message: 'Venta cancelada', sale });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
