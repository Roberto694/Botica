const express = require('express');
const { Op } = require('sequelize');
const { Product, Category, Supplier, InventoryMovement } = require('../models');
const { authenticate, authorize } = require('../middleware/auth.middleware');
const { publishAlert } = require('../services/notification.service');

const router = express.Router();

router.get('/', authenticate, async (req, res, next) => {
  try {
    const { search, category, supplier, page = 1, limit = 20 } = req.query;
    const where = {};
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { barcode: { [Op.iLike]: `%${search}%` } },
      ];
    }
    if (category) where.category_id = category;
    if (supplier) where.supplier_id = supplier;

    const products = await Product.findAndCountAll({
      where,
      include: ['category', 'supplier'],
      order: [['name', 'ASC']],
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticate, authorize(['Administrator', 'Supervisor']), async (req, res, next) => {
  try {
    const payload = req.body;
    const product = await Product.create(payload);
    await InventoryMovement.create({ product_id: product.id, quantity: product.stock, type: 'initial', note: 'Registro inicial de producto' });
    if (product.stock <= product.min_stock) {
      await publishAlert('stock', `Stock bajo para ${product.name}`, { productId: product.id });
    }
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authenticate, authorize(['Administrator', 'Supervisor']), async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    const updated = await product.update(req.body);
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authenticate, authorize(['Administrator']), async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    await product.destroy();
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
