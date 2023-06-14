"use strict";

const {
  db,
  models: { User, Item },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cody",
      password: "123",
      isAdmin: true,
      email: "asf2@gmail.com",
    }),
    User.create({
      username: "murphy",
      password: "123",
      isAdmin: true,
      email: "asdf@gmail.com",
    }),
  ]);

  const items = await Promise.all([
    Item.create({
      name: "Sugar",
      price: 100,
      description:
        "Adds sweetness to pastries and candies. Too much can be unhealthy.",
      imageUrl: "https://stardewvalleywiki.com/mediawiki/images/a/a9/Sugar.png",
    }),
    Item.create({
      name: "Grass Starter",
      price: 100,
      description: "	Place this on your farm to start a new patch of grass.",
      imageUrl:
        "https://stardewvalleywiki.com/mediawiki/images/1/14/Grass_Starter.png",
    }),
    Item.create({
      name: "Wallpaper",
      price: 100,
      description: "Decorates the walls of one room",
      imageUrl:
        "https://stardewvalleywiki.com/mediawiki/images/thumb/8/89/Wallpaper_001_Icon.png/54px-Wallpaper_001_Icon.png",
    }),
    Item.create({
      name: "Vinegar",
      price: 200,
      description: "An aged fermented liquid used in many cooking recipes.",
      imageUrl:
        "https://stardewvalleywiki.com/mediawiki/images/f/fe/Vinegar.png",
    }),
    Item.create({
      name: "Bean Starter",
      price: 60,
      description:
        "Plant these in the spring. Takes 10 days to mature, but keeps producing after that. Grows on a trellis.",
      imageUrl:
        "https://stardewvalleywiki.com/mediawiki/images/2/26/Bean_Starter.png",
    }),
    Item.create({
      name: "Potato Seeds",
      price: 50,
      description:
        "Plant these in the spring. Takes 6 days to mature, and has a chance of yielding multiple potatoes at harvest.",
      imageUrl:
        "https://stardewvalleywiki.com/mediawiki/images/4/44/Potato_Seeds.png",
    }),
    Item.create({
      name: "Tulip Bulb",
      price: 20,
      description:
        "Plant in spring. Takes 6 days to produce a colorful flower. Assorted colors.",
      imageUrl:
        "https://stardewvalleywiki.com/mediawiki/images/4/42/Tulip_Bulb.png",
    }),
    Item.create({
      name: "Pepper Seeds",
      price: 40,
      description:
        "Plant these in the summer. Takes 5 days to mature, and continues to produce after first harvest.",
      imageUrl:
        "https://stardewvalleywiki.com/mediawiki/images/6/67/Pepper_Seeds.png",
    }),
    Item.create({
      name: "Blueberry Seeds",
      price: 80,
      description:
        "Plant these in the summer. Takes 13 days to mature, and continues to produce after first harvest.",
      imageUrl:
        "https://stardewvalleywiki.com/mediawiki/images/8/81/Blueberry_Seeds.png",
    }),
    Item.create({
      name: "Radish Seeds",
      price: 40,
      description: "Plant these in the summer. Takes 6 days to mature.",
      imageUrl:
        "https://stardewvalleywiki.com/mediawiki/images/b/b1/Radish_Seeds.png",
    }),
    Item.create({
      name: "Cranberry Seeds	",
      price: 240,
      description:
        "Plant these in the fall. Takes 7 days to mature, and continues to produce after first harvest.",
      imageUrl:
        "https://stardewvalleywiki.com/mediawiki/images/e/ec/Cranberry_Seeds.png",
    }),
    Item.create({
      name: "Eggplant Seeds",
      price: 20,
      description:
        "Plant these in the fall. Takes 5 days to mature, and continues to produce after first harvest.",
      imageUrl:
        "https://stardewvalleywiki.com/mediawiki/images/f/f9/Eggplant_Seeds.png",
    }),
    Item.create({
      name: "Corn Seeds",
      price: 150,
      description:
        "Plant these in the summer or fall. Takes 14 days to mature, and continues to produce after first harvest.",
      imageUrl:
        "https://stardewvalleywiki.com/mediawiki/images/d/d1/Corn_Seeds.png",
    }),
    Item.create({
      name: "Fairy Seeds",
      price: 200,
      description:
        "Plant in fall. Takes 12 days to produce a mysterious flower. Assorted Colors.",
      imageUrl:
        "https://stardewvalleywiki.com/mediawiki/images/8/8e/Fairy_Seeds.png",
    }),
    Item.create({
      name: "Jazz Seeds",
      price: 30,
      description:
        "Plant in spring. Takes 7 days to produce a blue puffball flower.",
      imageUrl:
        "https://stardewvalleywiki.com/mediawiki/images/9/95/Jazz_Seeds.png",
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
    items,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
