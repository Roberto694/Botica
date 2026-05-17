const express = require('express');
const { User, Role } = require('../models');
const { hashPassword, comparePassword } = require('../utils/password.util');
const { signToken } = require('../utils/jwt.util');

const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email }, include: ['role'] });
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    user.last_login = new Date();
    await user.save();
    const token = signToken(user);
    res.json({ token, user: { id: user.id, full_name: user.full_name, email: user.email, role: user.role.name } });
  } catch (error) {
    next(error);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const { full_name, email, password, role = 'Cashier' } = req.body;
    const roleRecord = await Role.findOne({ where: { name: role } });
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ full_name, email, password: hashedPassword, role_id: roleRecord?.id || 2 });
    res.status(201).json({ id: user.id, full_name: user.full_name, email: user.email });
  } catch (error) {
    next(error);
  }
});

router.post('/recover', async (req, res) => {
  res.json({ message: 'Password recovery flow will be available in the next release.' });
});

module.exports = router;
