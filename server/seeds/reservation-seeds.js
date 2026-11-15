const { Room, Reservation } = require("../models");

const seedReservations = async () => {
  const rooms = await Room.findAll({
    order: [["id", "ASC"]],
  });

  if (rooms.length < 2) {
    throw new Error(
      "At least two rooms must exist before seeding reservations."
    );
  }

  const reservationData = [
    {
      roomId: rooms[0].id,
      reservedBy: "Jacob Gallardo",
      startTime: new Date("2026-11-16T14:00:00"),
      endTime: new Date("2026-11-16T15:30:00"),
      purpose: "Sprint Review",
      status: "confirmed",
    },
    {
      roomId: rooms[1].id,
      reservedBy: "John Smith",
      startTime: new Date("2026-11-16T14:00:00"),
      endTime: new Date("2026-11-16T15:30:00"),
      purpose: "Team Meeting",
      status: "confirmed",
    },
  ];

  return Reservation.bulkCreate(reservationData);
};

module.exports = seedReservations;
