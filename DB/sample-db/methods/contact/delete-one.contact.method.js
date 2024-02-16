const { Contact } = require("../../schemas");

async function deleteOne(id) {
  try {
    const deleted = await Contact.destroy({
      where: { id }
    });
    return deleted;
  } catch (error) {
    console.error(`Failed to delete contact with id ${id}:`, error);
    throw error;
  }
}

module.exports = { deleteOne };
