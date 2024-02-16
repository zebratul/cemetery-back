const { Company } = require("../../schemas");

/**
 * Получает отсортированный список компаний, с пагинацией.
 * @param {Object} params - Параметры фильтров и пагинации.
 * @returns {Promise<Object>}
 */
async function getSortedList({ status, type, sortBy = 'name', sortOrder = 'ASC', page = 1, pageSize = 10 }) {
  const where = {};
  if (status) where.status = status;
  if (type) where.type = type;

  const offset = (page - 1) * pageSize;
  const order = [[sortBy, sortOrder]];

  try {
    const { rows, count } = await Company.findAndCountAll({
      where,
      order,
      offset,
      limit: pageSize,
    });

    return {
      companies: rows.map(company => company.dataValues),
      total: count,
      page,
      totalPages: Math.ceil(count / pageSize),
    };
  } catch (error) {
    console.error(`Error fetching sorted list of companies:`, error);
    throw error;
  }
}

module.exports = { getSortedList };
