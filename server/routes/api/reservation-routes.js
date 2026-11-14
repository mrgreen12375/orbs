const router = require("express").Router();
const { Reservation, Room } = require("../../models");

// GET /api/reservations
// Get all reservations
router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      include: [
        {
          model: Room,
          attributes: ["id", "name"],
        },
      ],
      order: [["startTime", "ASC"]],
    });

    res.json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({
      message: "Failed to fetch reservations.",
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
      message: "Failed to fetch reservation.",
    });
  }
});

// POST /api/reservations
// Create reservation
router.post("/", async (req, res) => {
  try {
    const { roomId, reservedBy, startTime, endTime, purpose } = req.body;

    const reservation = await Reservation.create({
      roomId,
      reservedBy,
      startTime,
      endTime,
      purpose,
    });

    res.status(201).json(reservation);
  } catch (error) {
    console.error("Error creating reservation:", error);
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

// DELETE /api/reservations/:id
// Cancel reservation
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
