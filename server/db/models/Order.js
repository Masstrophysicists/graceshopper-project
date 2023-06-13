const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  fulfilled: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Order;
