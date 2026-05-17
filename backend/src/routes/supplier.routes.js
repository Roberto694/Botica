const express = require('express');
const { Supplier, Purchase } = require('../models');
const { authenticate, authorize } = require('../middleware/auth.middleware');

const router = express.Router();
router.use(authenticate);

router.get('/', async (req, res, next) => {
  try {
    const suppliers = await Supplier.findAll({ order: [['name', 'ASC']] });
    res.json(suppliers);
  } catch (error) {
    next(error);
  }
});

router.post('/', authorize(['Administrator', 'Supervisor']), async (req, res, next) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json(supplier);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/history', async (req, res, next) => {
  try {
    const history = await Purchase.findAll({ where: { supplier_id: req.params.id }, order: [['created_at', 'DESC']] });
    res.json(history);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
