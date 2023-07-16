const config = require("../config/config.js");
const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
  config.db.DB_NAME,
  config.db.DB_USER,
  config.db.DB_PASS,
  {
    host: config.db.DB_HOST,
    dialect: config.db.dialect,
    port: config.db.DB_PORT,

    poll: {
      max: config.db.pool.max,
      min: config.db.pool.min,
      acquire: config.db.pool.acquire,
      idle: config.db.pool.idle,
    },
    logging: false,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

db.attachment = require("./attachment.model.js")(sequelize, Sequelize, DataTypes);
db.candidate = require("./candidate.model.js")(sequelize, Sequelize, DataTypes);
db.employer = require("./employer.model.js")(sequelize, Sequelize, DataTypes);
db.job_application_education = require("./job_application_education.model.js")(sequelize, Sequelize, DataTypes);
db.job_application_experience = require("./job_application_experience.model.js")(sequelize, Sequelize, DataTypes);
db.job_application = require("./job_application.model.js")(sequelize, Sequelize, DataTypes);
db.job = require("./job.model.js")(sequelize, Sequelize, DataTypes);
db.user = require("./user.model.js")(sequelize, Sequelize, DataTypes);

module.exports = db;
