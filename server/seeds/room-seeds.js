const { Room } = require("../models");

const roomData = [
  {
    name: "Conference Room A",
    capacity: 6,
    location: "First Floor",
    active: true,
  },
  {
    name: "Conference Room B",
    capacity: 8,
    location: "First Floor",
    active: true,
  },
  {
    name: "Conference Room C",
    capacity: 10,
    location: "Second Floor",
    active: true,
  },
  {
    name: "Conference Room D",
    capacity: 12,
    location: "Second Floor",
    active: true,
  },
];

const seedRooms = async () => {
  await Room.bulkCreate(roomData, {
    updateOnDuplicate: ["capacity", "location", "active"],
  });
};

module.exports = seedRooms;
