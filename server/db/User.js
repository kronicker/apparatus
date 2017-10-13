const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const get = require('lodash/get');
const password = require('../lib/utils');

class User extends Model {
  static init(sequelize, DataTypes) {
    sequelize.initVirtualFields();
    const { Office } = sequelize.models;
    const { STRING, VIRTUAL } = DataTypes;
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
    const hooks = {
      afterValidate(user) {
        return password.hash(user.password)
          .then(hash => (user.password = hash));
      }
    };
    return super.init(fields, { sequelize, hooks });
  }

  static associate(models) {
    User.hasMany(models.Liability);
    User.belongsTo(models.Office);
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

module.exports = (sequelize, DataTypes) => User.init(sequelize, DataTypes);
