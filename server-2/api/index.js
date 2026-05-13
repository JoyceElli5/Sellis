const { connectDatabase } = require("../src/config/database");
const { seed } = require("../src/seeders/dataSeeder");
const app = require("../src/app");

let seeded = false;

module.exports = async (req, res) => {
  await connectDatabase();
  if (!seeded) {
    await seed();
    seeded = true;
  }
  return app(req, res);
};
