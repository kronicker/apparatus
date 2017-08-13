const { Model } = require('sequelize');

class User extends Model {
  static init(sequelize, DataTypes) {
    const fields = {
      email: {
        type: DataTypes.STRING,
        validate: { isEmail: true },
        unique: true
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      office: DataTypes.STRING
    };
    return super.init(fields, { sequelize });
  }

  static associate(models) {
    User.hasMany(models.Liability);
  }
}

module.exports = (sequelize, DataTypes) => User.init(sequelize, DataTypes);
