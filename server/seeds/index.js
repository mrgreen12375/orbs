const { sequelize, Room, Reservation } = require("../models");
const seedRooms = require("./room-seeds");

const seedDatabase = async () => {
  try {
    await sequelize.authenticate();

    // Create the rooms table first.
    await Room.sync();

    // Create the reservations table second.
    await Reservation.sync();

    // Populate the rooms table.
    await seedRooms();

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
