const { Company } = require("../../schemas");
/**
 * Возвращает данные компании с указанным идентификатором.
 * @param {number|string} id
 * @return {Promise<Object|null>}
 */
async function getOne(id) {
  try {
    const company = await Company.findByPk(id);
    return company ? company.dataValues : null;
  } catch (error) {
    console.error(`Failed to fetch company with id ${id}:`, error);
    throw error;
  }
}

module.exports = { getOne };
