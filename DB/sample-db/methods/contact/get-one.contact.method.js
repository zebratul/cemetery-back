const { Contact } = require("../../schemas");

async function getOne(id) {
  try {
    const contact = await Contact.findByPk(id);
    return contact ? contact.dataValues : null;
  } catch (error) {
    console.error(`Failed to fetch contact with id ${id}:`, error);
    throw error;
  }
}

module.exports = { getOne };
