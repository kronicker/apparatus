const { Model } = require('sequelize');

class Device extends Model {
  static init(sequelize, DataTypes) {
    const fields = {
      id: {
        type: DataTypes.STRING,
        validate: {
          isNumeric: true,
          len: 4,
          min: '0000',
          max: '9999'
        },
        primaryKey: true,
        unique: true
      },
      maker: DataTypes.STRING,
      model: DataTypes.STRING,
      os: DataTypes.STRING,
      serial: DataTypes.STRING
    };
    return super.init(fields, { sequelize });
  }

  static associate(models) {
    Device.hasMany(models.Liability);
  }
}

module.exports = (sequelize, DataTypes) => Device.init(sequelize, DataTypes);
