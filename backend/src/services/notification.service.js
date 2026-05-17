const { Server } = require('socket.io');
const { Product, Alert } = require('../models');

let io = null;

const initNotificationService = (server) => {
  io = new Server(server, { cors: { origin: '*' } });
  io.on('connection', (socket) => {
    socket.on('subscribe', () => socket.emit('notification', { message: 'Connected to Nova Salud real-time bus' }));
  });
};

const publishAlert = async (type, message, payload = {}) => {
  if (!io) return;
  await Alert.create({ type, message, payload });
  io.emit('notification', { type, message, payload, createdAt: new Date() });
};

const detectInventoryAlerts = async () => {
  const products = await Product.findAll();
  products.forEach(async (product) => {
    if (product.expiration_date && new Date(product.expiration_date) <= new Date()) {
      await publishAlert('expiration', `Producto expirado: ${product.name}`, { productId: product.id });
    }
    if (product.stock <= product.min_stock) {
      await publishAlert('stock', `Stock crítico: ${product.name}`, { productId: product.id, stock: product.stock });
    }
  });
};

module.exports = { initNotificationService, publishAlert, detectInventoryAlerts };
