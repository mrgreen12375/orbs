const Room = require("./Room");
const Reservation = require("./Reservation");

Room.hasMany(Reservation, {
  foreignKey: "id",
  onDelete: "CASCADE",
});

module.exports = { Room, Reservation };
