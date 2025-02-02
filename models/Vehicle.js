const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true }, // e.g., truck, van
    capacity: { type: Number, required: true },
    status: {
      type: String,
      enum: ["available", "booked"],
      default: "available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", VehicleSchema);
