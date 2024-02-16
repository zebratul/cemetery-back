const { Sequelize } = require('sequelize');
const logger = require("./logger.service")(module);

class Database {
  /**
  * Базовый класс сервиса работы с базами данных через Sequelize
  */
  #sequelize;

  constructor(connectionString) {
    this.#sequelize = new Sequelize(connectionString, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      define: {
        timestamps: true,
        underscored: true,
      },
      logging: (msg) => logger.debug(msg),
    });
  }

  /**
   * Проверка соединения с базой. Sequelize пуллит соединения автоматически.
   * @return {Promise<void>}
   */
  async connect() {
    try {
      await this.#sequelize.authenticate();
      logger.info(`Connection to the database has been established successfully.`);
    } catch (error) {
      logger.error(`Unable to connect to the database:`, error.message);
      throw error;
    }
  }

  /**
   * Закрывает соединение.
   * @return {Promise<void>}
   */
  async disconnect() {
    try {
      await this.#sequelize.close();
      logger.info(`Connection to the database has been closed successfully.`);
    } catch (error) {
      logger.error(`Error closing the database connection:`, error.message);
      throw error;
    }
  }

  /**
   * Возвращает объект соединения с БД.
   * @return {Sequelize}
   */
  get sequelize() {
    return this.#sequelize;
  }

}

module.exports = { Database };
