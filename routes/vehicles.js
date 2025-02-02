const express = require("express");
const {
  authenticate,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");
const {
  addVehicle,
  getVehicles,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/vehicleController");
const router = express.Router();

router.post("/", authenticate, authorizeAdmin, addVehicle);
router.get("/", authenticate, getVehicles);
router.put("/:id", authenticate, authorizeAdmin, updateVehicle);
router.delete("/:id", authenticate, authorizeAdmin, deleteVehicle);

module.exports = router;
