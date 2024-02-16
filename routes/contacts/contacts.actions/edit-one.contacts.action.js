const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const contactMethods = require("../../../DB/sample-db/methods/contact/edit-one.contact.method");
const { NotFound } = require("../../../constants/errors");

/**
 * PATCH /contacts/:id
 * Эндпоинт редактирования данных контакта.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function editOne(req, res) {
  logger.init("edit contact");
  const { id } = req.params;
  const data = req.body;

  try {
    const updatedContact = await contactMethods.editOne(id, data);
    if (!updatedContact) {
      throw new NotFound("Contact not found");
    }

    res.status(OK).json(updatedContact);
    logger.success();
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  editOne,
};
