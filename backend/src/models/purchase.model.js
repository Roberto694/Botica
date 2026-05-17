module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Purchase', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    purchase_number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(14, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'received',
    },
  }, {
    tableName: 'purchases',
  });
};
