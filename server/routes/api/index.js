const router = require("express").Router();

router.use("/rooms", require("./room-routes"));
router.use("/reservations", require("./reservation-routes"));

module.exports = router;
