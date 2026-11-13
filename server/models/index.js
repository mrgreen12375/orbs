const sequelize = require("../config/connection");
const Room = require("./Room");
const Reservation = require("./Reservation");

// A room can have multiple reservations.
Room.hasMany(Reservation, {
  foreignKey: "roomId",
  as: "reservations",
});

// Each reservation belongs to one room.
Reservation.belongsTo(Room, {
  foreignKey: "roomId",
  as: "room",
});

module.exports = {
  sequelize,
  Room,
  Reservation,
};
