
module.exports = (sequelize, DataTypes) => {
  const Liability = sequelize.define('Liability', {
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    status: {
      type: DataTypes.ENUM,
      values: ['active', 'pending', 'closed']
    }
  });

  Liability.associate = models => {
    Liability.belongsTo(models.User);
    Liability.belongsTo(models.Device);
  };

  return Liability;
};
