require("dotenv").config();

const app = require("./app");
const { connectDatabase } = require("./config/database");
const { seed } = require("./seeders/dataSeeder");

const PORT = process.env.PORT || 8080;

async function start() {
  await connectDatabase();
  await seed();
  app.listen(PORT, () => {
    console.log(`Sellis API running on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
