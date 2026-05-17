const { Sequelize } = require('sequelize');

const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/nova_salud';

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
  define: {
    underscored: true,
    timestamps: true,
  },
});

module.exports = { sequelize };
