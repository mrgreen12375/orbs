const sequelize = require("../config/connection");
const seedRooms = require("./room-seeds");

const seedDatabase = async () => {
  try {
    await sequelize.sync();
    await seedRooms();

    console.log("Database seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
