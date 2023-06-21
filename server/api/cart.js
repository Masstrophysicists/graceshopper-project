const {
  models: { User, Item, Cart, OrderItem },
} = require("../db");
const express = require("express");
const router = new express.Router();

router.get("/", async (req, res) => {
  const user = req.user;
  console.log("this is the user id........", user);

  const cartItems = await OrderItem.findAll();

  res.send(cartItems);
  // let cart = await Cart.findOne({
  //   where: { status: "created", userId: user.id },
  // });
  // let cartItems = await OrderItem.findAll({
  //   where: { cartId: cart.id },
  // });

  // res.json(cartItems);
});

module.exports = router;

router.get("/add/:id", async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  console.log("this is the user id........", user.id);

  //checking if cart exists and if not then creating one
  let cart = await Cart.findOne({
    where: { status: "created", userId: user.id },
  });
  if (!cart) {
    cart = await Cart.create({ status: "created", userId: user.id });
  }

  //checking if item exists
  const item = await Item.findByPk(id);
  if (!item) return res.status(404).send("item doesn't exist");

  //checking if the product is already in the cart and increasing the quantity if so
  let orderItem = await OrderItem.findOne({
    where: { cartId: cart.id, itemId: id },
  });
  if (orderItem) {
    await OrderItem.increment(
      { quantity: 1 },
      { where: { cartId: cart.id, itemId: id } }
    );
    await OrderItem.increment(
      { totalPrice: item.price },
      { where: { cartId: cart.id, itemId: id } }
    );
  }

  // if it doesnt exist , putting  new object
  if (!orderItem) {
    await OrderItem.create({
      totalPrice: item.price,
      cartId: cart.id,
      itemId: id,
    });
  }

  return res.send(user);
});

router.get("/remove/:id", async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  const item = await Item.findByPk(id);
  let cart = await Cart.findOne({
    where: { status: "created", userId: user.id },
  });

  //reduce quantity and/or remove entirely if quantity becomes 0
  let orderItem = await OrderItem.findOne({
    where: { cartId: cart.id, itemId: id },
  });
  if (orderItem) {
    if (orderItem.quantity === 1) {
      await OrderItem.destroy({
        where: {
          cartId: cart.id,
          itemId: id,
        },
      });
    } else {
      await OrderItem.decrement(
        { quantity: 1 },
        { where: { cartId: cart.id, itemId: id } }
      );
      await OrderItem.decrement(
        { totalPrice: item.price },
        { where: { cartId: cart.id, itemId: id } }
      );
    }
  }

  res.send(user);
});

router.get("/empty", async (req, res) => {
  const user = req.user;
  await Cart.update(
    { status: "completed" },
    {
      where: { status: "created", userId: user.id },
    }
  );

  res.send(user);
});

module.exports = router;
