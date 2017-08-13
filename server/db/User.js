const { Model } = require('sequelize');

class User extends Model {
  static init(sequelize, DataTypes) {
    const { STRING } = DataTypes;
    const fields = {
      email: {
        type: STRING,
        validate: { isEmail: true },
        unique: true
      },
      firstName: STRING,
      lastName: STRING,
      office: STRING
    };
    return super.init(fields, { sequelize });
  }

  static associate(models) {
    User.hasMany(models.Liability);
  }
}

module.exports = (sequelize, DataTypes) => User.init(sequelize, DataTypes);
