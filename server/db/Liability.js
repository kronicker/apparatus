const { Model } = require('sequelize');

class Liability extends Model {
  static init(sequelize, DataTypes) {
    const { DATE, ENUM } = DataTypes;
    const fields = {
      startDate: DATE,
      endDate: DATE,
      status: {
        type: ENUM,
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
