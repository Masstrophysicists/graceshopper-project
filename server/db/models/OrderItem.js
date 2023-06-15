const Sequelize = require("sequelize");
const db = require("../db");

const OrderItem = db.define("order_item", {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      isInt: true,
    },
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      isInt: true,
    },
  },
});

module.exports = OrderItem;
