const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Role = require('./role.model')(sequelize, DataTypes);
const User = require('./user.model')(sequelize, DataTypes);
const Category = require('./category.model')(sequelize, DataTypes);
const Product = require('./product.model')(sequelize, DataTypes);
const Customer = require('./customer.model')(sequelize, DataTypes);
const Supplier = require('./supplier.model')(sequelize, DataTypes);
const Sale = require('./sale.model')(sequelize, DataTypes);
const SaleDetail = require('./saleDetail.model')(sequelize, DataTypes);
const Alert = require('./alert.model')(sequelize, DataTypes);
const InventoryMovement = require('./inventoryMovement.model')(sequelize, DataTypes);
const Purchase = require('./purchase.model')(sequelize, DataTypes);

Role.hasMany(User, { foreignKey: 'role_id', as: 'users' });
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });
Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Supplier.hasMany(Product, { foreignKey: 'supplier_id', as: 'products' });
Product.belongsTo(Supplier, { foreignKey: 'supplier_id', as: 'supplier' });
Customer.hasMany(Sale, { foreignKey: 'customer_id', as: 'sales' });
Sale.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' });
Sale.hasMany(SaleDetail, { foreignKey: 'sale_id', as: 'details' });
SaleDetail.belongsTo(Sale, { foreignKey: 'sale_id', as: 'sale' });
Product.hasMany(SaleDetail, { foreignKey: 'product_id', as: 'saleDetails' });
SaleDetail.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Product.hasMany(InventoryMovement, { foreignKey: 'product_id', as: 'movements' });
InventoryMovement.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Purchase.belongsTo(Supplier, { foreignKey: 'supplier_id', as: 'supplier' });
Supplier.hasMany(Purchase, { foreignKey: 'supplier_id', as: 'purchases' });

module.exports = {
  sequelize,
  Role,
  User,
  Category,
  Product,
  Customer,
  Supplier,
  Sale,
  SaleDetail,
  Alert,
  InventoryMovement,
  Purchase,
};
