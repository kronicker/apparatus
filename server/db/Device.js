module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Device', {
    cat_num: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
        len: 4,
        min: '0000',
        max: '9999'
      },
      unique: true
    },
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    os: DataTypes.STRING,
    serial: DataTypes.STRING
  });

  User.associate = models => {
    User.hasMany(models.Liability);
  };

  return User;
};
