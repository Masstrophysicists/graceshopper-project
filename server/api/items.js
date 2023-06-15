const router = require("express").Router();
const {
  models: { Item },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const items = await Item.findAll({
      attributes: ["id", "name", "imageUrl"],
    });
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.get("/:itemId", async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.itemId);
    if (!item) return res.sendStatus(404);
    res.json(item);
  } catch (err) {
    next(err);
  }
});

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

router.put("/:itemId", requireAdmin, async (req, res, next) => {
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
