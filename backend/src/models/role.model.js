module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    permissions: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
  }, {
    tableName: 'roles',
  });
};
