const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const companyMethods = require("../../../DB/sample-db/methods/company/edit-one.company.method");
const { parseOne } = require("../companies.service");
const { getUrlForRequest } = require("../../../helpers/url.helper");
const { NotFound } = require("../../../constants/errors");

/**
 * PATCH /companies/:id
 * Эндпоинт редактирования данных компании.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */

async function editOne(req, res) {
  logger.init("edit company");
  const { id } = req.params;
  const data = req.body;

  try {
    const updated = await companyMethods.editOne(id, data);
    if (!updated) {
      throw new NotFound("Company not found");
    }

    const photoUrl = getUrlForRequest(req);
    res.status(OK).json(parseOne(updated, photoUrl));
    logger.success();
  } catch (error) {
    if (error.message.includes("not found")) {
      throw new NotFound(error.message);
    } else {
      logger.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = {
  editOne,
};
