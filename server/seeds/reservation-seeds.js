const { Reservation } = require("../models");

const reservationData = [
  {
    roomId: 1,
    reservedBy: "Jacob Gallardo",
    startTime: new Date("2026-11-16T14:00:00"),
    endTime: new Date("2026-11-16T15:30:00"),
    purpose: "Sprint Review",
    status: "confirmed",
  },
  {
    roomId: 2,
    reservedBy: "John Smith",
    startTime: new Date("2026-11-16T14:00:00"),
    endTime: new Date("2026-11-16T15:30:00"),
    purpose: "Team Meeting",
    status: "confirmed",
  },
];

const seedReservations = () => Reservation.bulkCreate(reservationData);

module.exports = seedReservations;
