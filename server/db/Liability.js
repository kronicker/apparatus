const { Model } = require('sequelize');

class Liability extends Model {
  static fields(DataTypes) {
    const { DATE, ENUM } = DataTypes;
    return {
      startDate: DATE,
      endDate: DATE,
      status: {
        type: ENUM,
        values: ['active', 'pending', 'closed']
      }
    };
  }

  static associate({ User, Device }) {
    Liability.belongsTo(User);
    Liability.belongsTo(Device);
  }
}

module.exports = Liability;
