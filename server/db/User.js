module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      },
      unique: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    office: DataTypes.STRING
  });

  User.associate = models => {
    User.hasMany(models.Liability);
  };

  return User;
};
