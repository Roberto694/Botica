module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Alert', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    payload: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  }, {
    tableName: 'alerts',
  });
};
