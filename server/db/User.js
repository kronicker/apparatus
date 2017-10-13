const get = require('lodash/get');
const { Model } = require('sequelize');
const password = require('../lib/utils');

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
        validate: { notEmpty: true },
        private: true
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
      beforeCreate(user) {
        return password.hash(user.password)
          .then(hash => (user.password = hash));
      },
      beforeUpdate(user) {
        if (!user.changed('password')) return false;
        return password.hash(user.password)
          .then(hash => (user.password = hash));
      }
    };
  }

  static associate({ Liability, Office }) {
    User.hasMany(Liability);
    User.belongsTo(Office);
  }

  // TODO: rewrite (check all keys, omit private ones)

  toJSON() {
    const user = super.toJSON();
    delete user.password;
    return user;
  }
}

module.exports = User;
