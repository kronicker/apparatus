const bcrypt = require('bcrypt');
const get = require('lodash/get');
const { hash: hashPassword } = require('../lib/utils');
const { Model } = require('sequelize');

class User extends Model {
  static fields(DataTypes, sequelize) {
    const { Office } = sequelize.models;
    const { STRING, VIRTUAL } = DataTypes;
    return {
      email: {
        type: STRING,
        validate: { isEmail: true },
        unique: true,
        allowNull: false
      },
      firstName: {
        type: STRING,
        allowNull: false,
        validate: { len: [2, 128] }
      },
      lastName: {
        type: STRING,
        allowNull: false,
        validate: { len: [2, 128] }
      },
      password: {
        type: STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [6, 100]
        }
      },
      office: {
        type: VIRTUAL,
        get() { return get(this, 'Office.name'); },
        include: [{ model: Office, attributes: ['name'] }]
      }
    };
  }

  static hooks() {
    return {
      afterValidate(user) {
        return hashPassword(user.password)
          .then(hash => (user.password = hash));
      }
    };
  }

  static associate({ Liability, Office }) {
    User.hasMany(Liability);
    User.belongsTo(Office);
  }

  validPassword(password) {
    return bcrypt.compare(password, this.password);
  }

  toJSON() {
    const user = super.toJSON();
    delete user.password;
    return user;
  }
}

module.exports = User;
