const { Model } = require('sequelize');

class User extends Model {
  static init(sequelize, DataTypes) {
    const { STRING } = DataTypes;
    const fields = {
      email: {
        type: STRING,
        validate: { isEmail: true },
        unique: true,
        allowNull: false
      },
      firstName: {
        type: STRING,
        allowNull: false,
        validate: { len: [2, 100] }
      },
      lastName: {
        type: STRING,
        allowNull: false,
        validate: { len: [2, 100] }
      },
      password: {
        type: STRING,
        allowNull: false,
        validate: { notEmpty: true }
      }
    };
    return super.init(fields, { sequelize });
  }

  static associate(models) {
    User.hasMany(models.Liability);
    User.belongsTo(models.Office);
  }
}

module.exports = (sequelize, DataTypes) => User.init(sequelize, DataTypes);
