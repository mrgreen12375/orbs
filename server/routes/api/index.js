const router = require("express").Router();
const roomRoutes = require("./room-routes");
const reservationRoutes = require("./reservation-routes");

router.use("/room", roomRoutes);
router.use("/reservation", reservationRoutes);

module.exports = router;
