const router = require("express").Router();
const {
  models: { Order, OrderItem, Item },
} = require("../db");

router.post("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { itemId, quantity } = req.body;
    const order = await Order.findOne({
      where: {
        userId: userId,
        status: "created",
      },
      include: OrderItem,
      // include: Item,
    });
    if (order) {
      const existingOrderItem = await OrderItem.findOne({
        where: {
          orderId: order.id,
          itemId: itemId,
        },
        // where: {
        //   include: OrderItem,
        // },
      });
      if (existingOrderItem) {
        existingOrderItem.quantity += quantity;
        await existingOrderItem.save();
        res.json(existingOrderItem);
      } else {
        const newOrderItem = await OrderItem.create({
          orderId: order.id,
          itemId: itemId,
          quantity: quantity,
          totalPrice: 100,
        });
        res.json(newOrderItem);
      }
    } else {
      const newOrder = await Order.create({
        userId: userId,
        status: "created",
      });
      const newOrderItem = await OrderItem.create({
        orderId: newOrder.id,
        itemId: itemId,
        quantity: quantity,
      });
      res.json(newOrderItem);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const order = await Order.findOne({
      where: {
        userId: userId,
        status: "created",
      },
      include: OrderItem,
    });
    if (!order) {
      return res.status(404).send("No order found");
    } else {
      res.json(order);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
