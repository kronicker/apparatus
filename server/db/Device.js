const { Model } = require('sequelize');

class Device extends Model {
  static init(sequelize, DataTypes) {
    const { STRING } = DataTypes;
    const fields = {
      id: {
        type: STRING,
        validate: {
          isNumeric: true,
          len: 4,
          min: '0000',
          max: '9999'
        },
        primaryKey: true,
        unique: true
      },
      maker: STRING,
      model: STRING,
      os: STRING,
      serial: STRING
    };
    return super.init(fields, { sequelize });
  }

  static associate(models) {
    Device.hasMany(models.Liability);
  }
}

module.exports = (sequelize, DataTypes) => Device.init(sequelize, DataTypes);
