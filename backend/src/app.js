const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const { json, urlencoded } = require('express');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const salesRoutes = require('./routes/sales.routes');
const customerRoutes = require('./routes/customer.routes');
const supplierRoutes = require('./routes/supplier.routes');
const reportRoutes = require('./routes/report.routes');
const alertRoutes = require('./routes/alert.routes');
const { errorHandler } = require('./middleware/error.middleware');

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(xss());
app.use(rateLimit({ windowMs: 1 * 60 * 1000, max: 120 }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/alerts', alertRoutes);

app.get('/api/ping', (req, res) => res.json({ status: 'ok', message: 'Nova Salud API is running' }));

app.use(errorHandler);

module.exports = app;
