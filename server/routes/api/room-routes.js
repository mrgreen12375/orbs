const router = require("express").Router();
const { Op } = require("sequelize");
const { Room } = require("../../models");

// get all rooms
router.get("/", async (req, res) => {
  try {
    const roomData = await Room.findAll();

    res.json(roomData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
