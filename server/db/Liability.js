const { Model } = require('sequelize');

class Liability extends Model {
  static init(sequelize, DataTypes) {
    const fields = {
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      status: {
        type: DataTypes.ENUM,
        values: ['active', 'pending', 'closed']
      }
    };
    return super.init(fields, { sequelize });
  }

  static associate(models) {
    Liability.belongsTo(models.User);
    Liability.belongsTo(models.Device);
  }
}

module.exports = (sequelize, DataTypes) => Liability.init(sequelize, DataTypes);
