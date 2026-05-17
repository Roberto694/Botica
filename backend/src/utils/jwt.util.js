const jwt = require('jsonwebtoken');

const signToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email, role: user.role_id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '8h',
  });
};

module.exports = { signToken };
