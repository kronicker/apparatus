const { Model } = require('sequelize');
const password = require('../lib/password');

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
        validate: { notEmpty: true },
        private: true
      }
    };
    const hooks = {
      beforeCreate(user) {
        return password.hash(user.password)
          .then(hash => user.password = hash);
      },
      beforeUpdate(user) {
        if (user.changed('password')) {
          return password.hash(user.password)
            .then(hash => user.password = hash);
        }
      }
    };
    return super.init(fields, { sequelize, hooks });
  }

  static associate(models) {
    User.hasMany(models.Liability);
    User.belongsTo(models.Office);
  }

  // todo rewrite (check all keys, omit private ones)

  toJSON() {
    const user = super.toJSON();
    delete user.password;
    return user;
  }
}

module.exports = (sequelize, DataTypes) => User.init(sequelize, DataTypes);
