const { startServer } = require("./server");
const logger = require("./services/logger.service")(module);
require('dotenv').config();
// todo: разкомментировать для работы с БД
const { Database } = require("./services/database.service"); 
const connectionString = process.env.DATABASE_URL;
const database = new Database(connectionString);

(async () => {
  try {
    // todo: разкомментировать для работы с БД
    await database.connect();
    startServer();
  } catch (error) {
    logger.error(error.message);
    // todo: разкомментировать для работы с БД
    await database.disconnect();
    logger.shutdown(() => process.exit(1));
  }
})();

["SIGINT", "SIGTERM", "SIGQUIT"].forEach((signal) =>
  process.on(signal, async () => {
    // todo: разкомментировать для работы с БД
    await database.disconnect();
    logger.info(`Caught signal ${signal}`);
    logger.shutdown(() => process.exit(0));
  })
);

process.on("uncaughtException", async (error) => {
  // todo: разкомментировать для работы с БД
  await database.disconnect();
  logger.error(`Uncaught exception! ${error.message}`);
  logger.shutdown(() => process.exit(1));
});

module.exports = { database };
