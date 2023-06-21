const router = require("express").Router();
const {
  models: { Item, User },
} = require("../db");
module.exports = router;

async function requireToken(req, res, next) {
  try {
    const token = req.headers.authorization;
    console.log("Token: ", token);
    const user = await User.findByToken(token);
    console.log("User: ", user);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

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
    console.log(item);
    if (!item) return res.sendStatus(404);
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// this is the function to check is the user isAdmin or is a user at all.
async function requireAdmin(req, res, next) {
  if (!req.user || !req.user.isAdmin) {
    console.log("Not admin or no user");
    return res.status(403).send("You shall not pass!");
  }
  next();
}

// this route helps add items into our items page
router.post("/", requireToken, requireAdmin, async (req, res, next) => {
  try {
    console.log("Request body: ", req.body);
    const item = await Item.create(req.body);
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// this helps us edit items
router.put("/:itemId", requireToken, requireAdmin, async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.itemId);
    if (!item) return res.sendStatus(404);
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// this helps us delete items.
router.delete(
  "/:itemId",
  requireToken,
  requireAdmin,
  async (req, res, next) => {
    try {
      const item = await Item.findByPk(req.params.itemId);
      await item.destroy();
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);
