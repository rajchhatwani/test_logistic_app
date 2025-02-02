const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },
  documentName: {
    type: String,
    required: true,
  },
  documentPath: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Document", DocumentSchema);
