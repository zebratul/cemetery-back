const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Contact extends Model {}
  
    Contact.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      lastname: { type: DataTypes.STRING, allowNull: false },
      firstname: { type: DataTypes.STRING, allowNull: false },
      patronymic: { type: DataTypes.STRING, allowNull: true },
      phone: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
    }, {
      sequelize,
      modelName: 'Contact',
    });
  
    return Contact;
  };
  