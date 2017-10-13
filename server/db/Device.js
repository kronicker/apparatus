const { Model } = require('sequelize');

class Device extends Model {
  static fields(DataTypes) {
    const { STRING } = DataTypes;
    return {
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
  }

  static associate(models) {
    Device.hasMany(models.Liability);
  }
}

module.exports = Device;
