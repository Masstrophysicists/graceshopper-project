//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");

const Item = require("./models/Item");

const OrderItem = require("./models/OrderItem");

const Cart = require("./models/Cart");

//associations could go here!
User.hasMany(Cart);
Cart.belongsTo(User);

Cart.hasMany(OrderItem);
OrderItem.belongsTo(Cart);

Item.hasMany(OrderItem);
OrderItem.belongsTo(Item);

module.exports = {
  db,
  models: {
    User,
    Item,
    OrderItem,
    Cart,
  },
};
