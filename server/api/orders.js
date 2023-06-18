const router = require("express").Router();
const {
  models: { Order, OrderItem, Item },
} = require("../db");

// Get all items in an order
router.get("/:orderId", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: {
        model: OrderItem,
        include: Item, // Include the associated Item with each OrderItem
      },
    });

    if (order.userId !== Number(req.user.id)) {
      // Make sure the order belongs to the logged-in user
      return res.sendStatus(403);
    }

    res.json(order.orderItems);
  } catch (err) {
    next(err);
  }
});

// Add an item to an order
router.post("/:orderId/items", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId);

    if (!req.user || order.userId !== req.user.id) {
      // Make sure the order belongs to the logged-in user
      return res.sendStatus(403);
    }

    const item = await Item.findByPk(req.body.itemId);

    const orderItem = await OrderItem.create({
      quantity: req.body.quantity || 1, // default to 1 if no quantity is provided
      totalPrice: item.price * (req.body.quantity || 1),
    });

    await orderItem.setItem(item);
    await orderItem.setOrder(order);
    await orderItem.save();

    res.json(orderItem);
  } catch (err) {
    next(err);
  }
});

// Update an item in an order
router.put("/:orderId/items/:orderItemId", async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.orderItemId);

    if (orderItem.orderId !== Number(req.params.orderId)) {
      // Make sure the order item is in the specified order
      return res.sendStatus(403);
    }

    const updatedOrderItem = await orderItem.update(req.body);
    res.json(updatedOrderItem);
  } catch (err) {
    next(err);
  }
});

// Delete an item from an order
router.delete("/:orderId/items/:orderItemId", async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.orderItemId);

    if (orderItem.orderId !== Number(req.params.orderId)) {
      // Make sure the order item is in the specified order
      return res.sendStatus(403);
    }

    await orderItem.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
