require('dotenv').config();
const http = require('http');
const app = require('./app');
const { sequelize } = require('./models');
const { initNotificationService } = require('./services/notification.service');

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

initNotificationService(server);

sequelize.authenticate()
  .then(() => sequelize.sync({ alter: true }))
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Nova Salud backend started on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
  });
