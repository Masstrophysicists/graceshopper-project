const {
  models: { User, Item },
} = require("../db");
const express = require("express");
const router = new express.Router();

router.get("/add/:id", async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  console.log(user);
  let cart = JSON.parse(user.cart);

  //checking if item exists
  const item = await Item.findByPk(id);
  if (!item) return res.status(404).send("item doesn't exist");

  //checking if the product is already in the cart and increasing the quantity if so
  let copy = false;
  cart.forEach((item, index) => {
    if (item.productId == id) {
      copy = true;
      cart[index].quantity++;
      return;
    }
  });
  // if it doesnt exist , putting  new object
  if (!copy) {
    cart.push({ productId: id, quantity: 1 });
  }
  // cloning our updated cart
  const newCart = JSON.stringify(cart);
  //updating the user
  await user.update({ cart: newCart });

  return res.send(user);
});

router.get("/remove/:id", async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  let cart = JSON.parse(user.cart);

  //reduce quantity
  let last = false;
  cart = cart.map((item) => {
    if (item.productId == id) {
      if (item.quantity > 1)
        return { productId: id, quantity: --item.quantity };
      else {
        last = true;
        return item;
      }
    }
    return item;
  });

  //remove entirely
  if (last) {
    cart = cart.filter((item) => {
      if (item.productId == id) return false;
      return true;
    });
  }
  // cloning our updated cart
  const newCart = JSON.stringify(cart);
  //updating the user
  await user.update({ cart: newCart });

  return res.send(user);
});

router.get("/empty", async (req, res) => {
  const user = req.user;
  await user.update({ cart: "[]" });
  res.send(user);
});

module.exports = router;
