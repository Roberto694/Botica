const express = require('express');
const { User, Role } = require('../models');
const { authenticate, authorize } = require('../middleware/auth.middleware');
const { hashPassword } = require('../utils/password.util');

const router = express.Router();

router.use(authenticate);
router.use(authorize(['Administrator', 'Supervisor']));

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({ include: ['role'], order: [['full_name', 'ASC']] });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, { include: ['role'] });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { full_name, email, password, role } = req.body;
    const roleRecord = await Role.findOne({ where: { name: role || 'Cashier' } });
    const user = await User.create({ full_name, email, password: await hashPassword(password), role_id: roleRecord.id });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    if (req.body.password) req.body.password = await hashPassword(req.body.password);
    const updated = await user.update(req.body);
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    await user.destroy();
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
