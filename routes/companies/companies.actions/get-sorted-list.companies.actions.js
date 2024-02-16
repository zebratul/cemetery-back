const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const companyMethods = require("../../../DB/sample-db/methods/company/get-sorted-list.method");
const { NotFound } = require("../../../constants/errors");

/**
 * GET /companies/sorted-list
 * Эндпоинт для получения отсортированного списока компаний, с пагинацией.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {Promise<void>}
 */
async function getSortedList(req, res, next) {
  logger.init("get sorted list of companies");
  const { status, type, sortBy, sortOrder, page, pageSize } = req.query;

  try {
    const result = await companyMethods.getSortedList({
      status,
      type,
      sortBy,
      sortOrder,
      page: parseInt(page, 10) || 1,
      pageSize: parseInt(pageSize, 10) || 10,
    });

    if (!result || result.companies.length === 0) {
      throw new NotFound("No companies found based on the provided criteria.");
    }

    res.status(OK).json(result);
    logger.success();
  } catch (error) {
    logger.error(`Failed to get sorted list of companies: ${error.message}`);
    next(error); 
  }
}

module.exports = {
    getSortedList,
};
