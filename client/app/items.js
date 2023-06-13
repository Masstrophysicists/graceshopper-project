const router = require("express").Router();
const {
  models: { Item },
} = require("../db");

async function requireAdmin(req, res, next) {
  if (!req.user || !req.user.isAdmin) {
    return res.sendStatus(403).send("You shall not pass!");
  }
}

router.post("/", requireAdmin, async (req, res, next) => {
  try {
    const item = await Item.create(req.body);
    res.json(item);
  } catch (err) {
    next(err);
  }
});

router.put("/:itemId", async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.itemId);
    if (!product) return res.sendStatus(404);
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    next(err);
  }
});

router.delete("/:itemId", requireAdmin, async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.itemId);
    await item.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;