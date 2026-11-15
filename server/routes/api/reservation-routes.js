const router = require("express").Router();
const { Op } = require("sequelize");
const { Reservation, Room } = require("../../models");

// GET /api/reservations
// Get all reservations
router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      include: [
        {
          model: Room,
          as: "room",
          attributes: ["id", "name"],
        },
      ],
      order: [["startTime", "ASC"]],
    });

    res.json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET /api/reservations/:id
// Get one reservation
router.get("/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id, {
      include: [
        {
          model: Room,
          as: "room",
          attributes: ["id", "name"],
        },
      ],
    });

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found.",
      });
    }

    res.json(reservation);
  } catch (error) {
    console.error("Error fetching reservation:", error);
    res.status(500).json({
      message: error.message,
    });
  }
});

// POST /api/reservations
// Create reservation
router.post("/", async (req, res) => {
  try {
    const { roomId, reservedBy, startTime, endTime, purpose } = req.body;

    const conflictingReservation = await Reservation.findOne({
      where: {
        roomId,

        startTime: {
          [Op.lt]: endTime,
        },

        endTime: {
          [Op.gt]: startTime,
        },
      },
    });

    if (conflictingReservation) {
      return res.status(400).json({
        message: "This room is already reserved during that time.",
      });
    }

    const reservation = await Reservation.create({
      roomId,
      reservedBy,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      purpose,
    });

    res.status(201).json(reservation);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// PUT /api/reservations/:id
// Update reservation
router.put("/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found.",
      });
    }

    await reservation.update(req.body);

    res.json(reservation);
  } catch (error) {
    console.error("Error updating reservation:", error);
    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE /api/reservations
// Delete all reservations
router.delete("/", async (req, res) => {
  try {
    const deletedCount = await Reservation.destroy({
      where: {},
    });

    res.json({
      message: "All reservations deleted successfully.",
      deletedCount,
    });
  } catch (error) {
    console.error("Error deleting all reservations:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE /api/reservations/:id
// Delete reservation
router.delete("/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found.",
      });
    }

    await reservation.destroy();

    res.json({
      message: "Reservation deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    res.status(500).json({
      message: "Failed to delete reservation.",
    });
  }
});

module.exports = router;
