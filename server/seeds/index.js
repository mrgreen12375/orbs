const { sequelize } = require("../models");
const seedRooms = require("./room-seeds");

const seedDatabase = async () => {
  try {
    console.log("Connecting to database...");

    await sequelize.authenticate();

    console.log("Synchronizing database...");
    await sequelize.sync();

    console.log("Seeding rooms...");
    await seedRooms();

    console.log("Database successfully seeded!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
