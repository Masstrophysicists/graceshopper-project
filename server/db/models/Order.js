const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  fulfilled: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      notEmpty: true,
    },
  },
  status: {
    type: Sequelize.ENUM("created", "processing", "cancelled", "completed"),
    allowNull: false,
  },
});

module.exports = Order;
