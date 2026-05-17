const express = require('express');
const { Alert } = require('../models');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();
router.use(authenticate);

router.get('/', async (req, res, next) => {
  try {
    const alerts = await Alert.findAll({ order: [['created_at', 'DESC']], limit: 50 });
    res.json(alerts);
  } catch (error) {
    next(error);
  }
});

router.put('/:id/read', async (req, res, next) => {
  try {
    const alert = await Alert.findByPk(req.params.id);
    if (!alert) return res.status(404).json({ message: 'Alerta no encontrada' });
    alert.read = true;
    await alert.save();
    res.json(alert);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
