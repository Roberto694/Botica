const express = require('express');
const { Op, fn, col } = require('sequelize');
const { Sale, Product, InventoryMovement, Alert, User, Customer } = require('../models');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();
router.use(authenticate);

router.get('/dashboard', async (req, res, next) => {
  try {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const salesToday = await Sale.sum('total', { where: { created_at: { [Op.gte]: today.setHours(0, 0, 0, 0) } } });
    const monthlyRevenue = await Sale.sum('total', { where: { created_at: { [Op.gte]: firstDay } } });
    const totalSales = await Sale.count();
    const lowStock = await Product.count({ where: { stock: { [Op.lte]: col('min_stock') } } });
    const alerts = await Alert.count({ where: { read: false } });
    const topProducts = await Product.findAll({ order: [['stock', 'ASC']], limit: 5 });
    const topCustomers = await Customer.findAll({ limit: 5 });
    res.json({ salesToday: salesToday || 0, monthlyRevenue: monthlyRevenue || 0, totalSales, lowStock, unreadAlerts: alerts, topProducts, topCustomers });
  } catch (error) {
    next(error);
  }
});

router.get('/sales', async (req, res, next) => {
  try {
    const { from, to } = req.query;
    const where = {};
    if (from && to) {
      where.created_at = { [Op.between]: [new Date(from), new Date(to)] };
    }
    const sales = await Sale.findAll({ where, order: [['created_at', 'DESC']] });
    res.json(sales);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
