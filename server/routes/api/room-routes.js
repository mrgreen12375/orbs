const router = require("express").Router();
const { Room } = require("../../models");

// GET /api/rooms
// Get all active rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.findAll({
      where: { active: true },
      order: [["name", "ASC"]],
    });

    res.json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Failed to fetch rooms." });
  }
});

// GET /api/rooms/:id
// Get a single room
router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);

    if (!room) {
      return res.status(404).json({ message: "Room not found." });
    }

    res.json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ message: "Failed to fetch room." });
  }
});

module.exports = router;
