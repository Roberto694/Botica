require('dotenv').config();
const { sequelize, Role, User, Category, Supplier, Product } = require('../models');
const { hashPassword } = require('../utils/password.util');

const seed = async () => {
  await sequelize.sync({ alter: true });

  const roles = [
    { name: 'Administrator', permissions: { fullAccess: true } },
    { name: 'Supervisor', permissions: { manageUsers: true } },
    { name: 'Cashier', permissions: { sales: true } },
    { name: 'Pharmacist', permissions: { inventory: true } },
  ];

  for (const roleData of roles) {
    await Role.findOrCreate({ where: { name: roleData.name }, defaults: roleData });
  }

  const adminRole = await Role.findOne({ where: { name: 'Administrator' } });

  await User.findOrCreate({
    where: { email: 'admin@novasalud.com' },
    defaults: {
      full_name: 'Admin Nova Salud',
      password: await hashPassword('NovaSalud123'),
      role_id: adminRole.id,
    },
  });

  const categories = [
    { name: 'Medicamentos', description: 'Medicamentos y suplementos' },
    { name: 'Cuidado personal', description: 'Productos de higiene y cuidado' },
  ];
  const suppliers = [
    { name: 'Laboratorio Vida', contact_name: 'Rosa Pérez', email: 'contacto@laboratoriovida.com', phone: '999-111-222' },
    { name: 'Farma Global', contact_name: 'Carlos Huaman', email: 'ventas@farmaglobal.com', phone: '999-333-444' },
  ];

  for (const category of categories) {
    await Category.findOrCreate({ where: { name: category.name }, defaults: category });
  }
  for (const supplier of suppliers) {
    await Supplier.findOrCreate({ where: { name: supplier.name }, defaults: supplier });
  }

  const medCategory = await Category.findOne({ where: { name: 'Medicamentos' } });
  const supplier = await Supplier.findOne({ where: { name: 'Laboratorio Vida' } });

  await Product.findOrCreate({
    where: { barcode: '7501001001001' },
    defaults: {
      name: 'Paracetamol 500mg',
      barcode: '7501001001001',
      sku: 'PARA500',
      description: 'Tabletas efervescentes para dolor y fiebre',
      price: 7.50,
      cost: 3.20,
      stock: 120,
      min_stock: 15,
      batch: 'B2026A',
      lot: 'L001',
      expiration_date: '2025-12-31',
      category_id: medCategory.id,
      supplier_id: supplier.id,
    },
  });

  console.log('Seed complete');
  process.exit(0);
};

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
