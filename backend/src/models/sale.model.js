module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Sale', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    invoice_number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(14, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'cash',
    },
    payment_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'paid',
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'completed',
    },
    cashier_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  }, {
    tableName: 'sales',
  });
};
