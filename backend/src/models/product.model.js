module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    barcode: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    cost: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    min_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
    },
    batch: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lot: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expiration_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'products',
  });
};
