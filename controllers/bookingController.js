const Booking = require("../models/Booking");
const Vehicle = require("../models/Vehicle");

// Create Booking
exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    // Update vehicle status
    await Vehicle.findByIdAndUpdate(req.body.vehicleId, { status: "booked" });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error });
  }
};

// Get Bookings by User
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).populate(
      "vehicleId"
    );
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

// Cancel Booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );

    // Update vehicle status
    await Vehicle.findByIdAndUpdate(booking.vehicleId, { status: "available" });

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error cancelling booking", error });
  }
};
