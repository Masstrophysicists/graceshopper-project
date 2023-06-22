const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
  status: {
    type: Sequelize.ENUM("created", "processing", "cancelled", "completed"),
    allowNull: false,
  },
});

module.exports = Cart;
