const { Company } = require("../../schemas");

/**
 * Редактирует данные компании с указанным идентификатором и возвращает результат.
 * @param {string|number} id
 * @param {Object} data
 * @return {Promise<Object>} - A promise that resolves to the updated company object.
 */
async function editOne(id, data) {
  try {
    const company = await Company.findByPk(id);
    if (!company) {
      throw new Error(`Company with id ${id} not found.`);
    }

    await company.update(data);
    return company.dataValues; // Using .dataValues for the updated company object
  } catch (error) {
    console.error(`Failed to update company with id ${id}:`, error);
    throw error;
  }
}

module.exports = { editOne };
