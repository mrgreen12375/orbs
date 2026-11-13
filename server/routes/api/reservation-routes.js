const router = require("express").Router();
const { Op } = require("sequelize");
const { Reservation } = require("../../models");

// get all rooms
router.get("/", async (req, res) => {
  try {
    const reservationData = await Reservation.findAll();

    res.json(reservationData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
