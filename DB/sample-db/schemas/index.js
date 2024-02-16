const { Sequelize } = require('sequelize');
require('dotenv').config();
const connectionString = process.env.DATABASE_URL;

const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    define: {
      timestamps: true,
      underscored: true,
    },
  });

const Company = require('./CompanyModel')(sequelize);
const Contact = require('./ContactModel')(sequelize);
const User = require('./UserModel')(sequelize);

module.exports = { Company, Contact, User };