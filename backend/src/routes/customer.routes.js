const express = require('express');
const { Customer, Sale } = require('../models');
const { authenticate, authorize } = require('../middleware/auth.middleware');

const router = express.Router();
router.use(authenticate);

router.get('/', async (req, res, next) => {
  try {
    const customers = await Customer.findAll({ order: [['full_name', 'ASC']] });
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

router.post('/', authorize(['Administrator', 'Cashier', 'Pharmacist', 'Supervisor']), async (req, res, next) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authorize(['Administrator', 'Supervisor']), async (req, res, next) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Cliente no encontrado' });
    const updated = await customer.update(req.body);
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authorize(['Administrator']), async (req, res, next) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Cliente no encontrado' });
    await customer.destroy();
    res.json({ message: 'Cliente eliminado' });
  } catch (error) {
    next(error);
  }
});

router.get('/:id/history', async (req, res, next) => {
  try {
    const records = await Sale.findAll({ where: { customer_id: req.params.id }, order: [['created_at', 'DESC']] });
    res.json(records);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
