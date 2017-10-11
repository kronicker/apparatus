const { Model } = require('sequelize');
const reOffice = /[a-z][0-9]{1,2}$/i;

class Office extends Model {
  static init(sequelize, DataTypes) {
    const { STRING } = DataTypes;
    const fields = {
      name: {
        type: STRING,
        allowNull: false,
        validate: { is: reOffice }
      }
    };
    return super.init(fields, { sequelize });
  }

  static associate(models) {
    Office.hasMany(models.User);
  }
}

module.exports = (sequelize, DataTypes) => Office.init(sequelize, DataTypes);
