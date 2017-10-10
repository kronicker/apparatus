const { Model } = require('sequelize');
const office = '[a-z][0-9]{1,2}$';

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
        validate: {
          len: [2, 100]
        }
      },
      lastName: {
        type: STRING,
        allowNull: false,
        validate: {
          len: [2, 100]
        }
      },
      office: {
        type: STRING,
        allowNull: false,
        validate: {
          is: office
        }
      }
    };
    return super.init(fields, { sequelize });
  }

  static associate(models) {
    User.hasMany(models.Liability);
  }
}

module.exports = (sequelize, DataTypes) => User.init(sequelize, DataTypes);
