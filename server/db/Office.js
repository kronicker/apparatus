const { Model } = require('sequelize');
const reOffice = /^[A-Z]\d{1,2}$/;

class Office extends Model {
  static fields(DataTypes) {
    const { STRING } = DataTypes;
    return {
      name: {
        type: STRING,
        allowNull: false,
        validate: { is: reOffice }
      }
    };
  }

  static associate({ User }) {
    Office.hasMany(User);
  }
}

module.exports = Office;
