const logger = require("../../../services/logger.service")(module);
const { OK, NotFoundError } = require("../../../constants/http-codes");
const contactMethods = require("../../../DB/sample-db/methods/contact/delete-one.contact.method");
const { NotFound } = require("../../../constants/errors");

/**
 * DELETE /contacts/:id
 * Эндпоинт удаления контактов.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {Promise<void>}
 */
async function deleteOne (req, res, next) {
  logger.init("delete contact");
  const { id } = req.params;

  try {
    const deletedCount = await contactMethods.deleteOne(id);
    if (deletedCount === 0) {
      throw new NotFound(`Contact with id ${id} not found`);
    }

    res.status(OK).json({ message: "Contact deleted successfully" });
    logger.success();
  } catch (error) {
    if (error instanceof NotFound) {
      next(new NotFoundError(error.message));
    } else {
      logger.error(error.message);
      next(error);
    }
  }
}

module.exports = {
    deleteOne,
};
