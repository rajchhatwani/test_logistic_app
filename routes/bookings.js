const express = require("express");
const { authenticate } = require("../middlewares/authMiddleware");
const {
  createBooking,
  getUserBookings,
  cancelBooking,
} = require("../controllers/bookingController");
const router = express.Router();

router.post("/", authenticate, createBooking);
router.get("/user/:userId", authenticate, getUserBookings);
router.put("/:id/cancel", authenticate, cancelBooking);

module.exports = router;
