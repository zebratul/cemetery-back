const { Contact } = require("../../schemas");

/**
 * Редактирует данные контакта с указанным идентификатором
 * и возвращает результат.
 * @param {string} id
 * @param {Object} data
 * @return {Object}
 */
async function editOne(id, data) {
  try {
    const [updateCount, updatedContacts] = await Contact.update(data, {
      where: { id },
      returning: true,
    });

    if (updateCount === 0) {
      return null;
    }

    return updatedContacts.dataValues;
  } catch (error) {
    console.error(`Failed to update contact with id ${id}:`, error);
    throw error;
  }
}

module.exports = { editOne };