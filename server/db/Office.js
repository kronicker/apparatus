const { Model } = require('sequelize');
const reOffice = /^[A-Z]\d{1,2}$/;

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

  static associate({ User }) {
    Office.hasMany(User);
  }
}

module.exports = (sequelize, DataTypes) => Office.init(sequelize, DataTypes);
