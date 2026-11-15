const sequelize = require("../config/connection");

const seedRooms = require("./room-seeds");
const seedReservations = require("./reservation-seeds");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedRooms();
  await seedReservations();

  process.exit(0);
};

seedAll();
