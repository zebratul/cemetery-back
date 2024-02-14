require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
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

// Assuming these imports are adjusted to where you've saved your model definitions
const Contact = require('./DB/sample-db/schemas/ContactModel')(sequelize);
const Company = require('./DB/sample-db/schemas/CompanyModel')(sequelize);
const User = require('./DB/sample-db/schemas/UserModel')(sequelize);

async function populateDB() {
  try {
    await sequelize.sync({ force: true }); // Warning: This will drop existing tables and recreate them

    // Create sample contacts
    const contacts = await Contact.bulkCreate([
      { lastname: 'Ivanov', firstname: 'Ivan', patronymic: 'Ivanovich', phone: '1234567890', email: 'ivanov@example.com' },
      { lastname: 'Petrov', firstname: 'Petr', patronymic: 'Petrovich', phone: '0987654321', email: 'petrov@example.com' },
      { lastname: 'Sidorov', firstname: 'Sidr', patronymic: 'Sidorovich', phone: '1112223334', email: 'sidorov@example.com' },
    ]);

    // Create sample companies
    await Company.bulkCreate([
      { name: 'Company One', shortName: 'Comp1', businessEntity: 'LLC', contactId: contacts[0].id, address: 'Address 1', contractNo: '123', contractIssueDate: new Date(), type: ['agent'], status: 'active', photos: JSON.stringify([{ name: 'photo1.png', filepath: '/path/to/photo1.png', thumbpath: '/path/to/thumb_photo1.png' }]) },
      { name: 'Company Two', shortName: 'Comp2', businessEntity: 'Inc', contactId: contacts[1].id, address: 'Address 2', contractNo: '456', contractIssueDate: new Date(), type: ['contractor'], status: 'active', photos: JSON.stringify([{ name: 'photo2.png', filepath: '/path/to/photo2.png', thumbpath: '/path/to/thumb_photo2.png' }]) },
      { name: 'Company Three', shortName: 'Comp3', businessEntity: 'GmbH', contactId: contacts[2].id, address: 'Address 3', contractNo: '789', contractIssueDate: new Date(), type: ['agent', 'contractor'], status: 'active', photos: JSON.stringify([{ name: 'photo3.png', filepath: '/path/to/photo3.png', thumbpath: '/path/to/thumb_photo3.png' }]) },
    ]);

    // Create sample users - Make sure to hash passwords in a real application
    await User.bulkCreate([
      { username: 'user1', password: 'password1' },
      { username: 'user2', password: 'password2' },
      { username: 'user3', password: 'password3' },
    ]);

    console.log('Database has been populated successfully.');
  } catch (error) {
    console.error('Failed to populate the database:', error);
  } finally {
    await sequelize.close();
  }
}

populateDB();
