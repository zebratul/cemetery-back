const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Company extends Model {}

  Company.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    contactId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'contacts', key: 'id' } },
    name: { type: DataTypes.STRING, allowNull: false },
    shortName: { type: DataTypes.STRING, allowNull: false },
    businessEntity: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    contractNo: { type: DataTypes.STRING, allowNull: false },
    contractIssueDate: { type: DataTypes.DATE, allowNull: false },
    type: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    photos: { type: DataTypes.JSONB, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  }, {
    sequelize,
    modelName: 'Company',
  });

  return Company;
};
