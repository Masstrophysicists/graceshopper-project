//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");

const Item = require("./models/Item");

const Order = require("./models/Order");

const OrderItem = require("./models/OrderItem");

const Cart = require("./models/Cart");

//associations could go here!
User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Item.hasMany(OrderItem);
OrderItem.belongsTo(Item);

module.exports = {
  db,
  models: {
    User,
    Item,
    Order,
    OrderItem,
    Cart,
  },
};
