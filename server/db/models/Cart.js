const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
  // fulfilled: {
  //   type: Sequelize.BOOLEAN,
  //   allowNull: false,
  //   defaultValue: false,
  //   validate: {
  //     notEmpty: true,
  //   },
  // },
  status: {
    type: Sequelize.ENUM("created", "processing", "cancelled", "completed"),
    allowNull: false,
  },
});

module.exports = Cart;
