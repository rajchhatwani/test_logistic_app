const express = require("express");
const router = express.Router();

const {
  upload,
  getDocumentById,
} = require("../controllers/documentController");

router.post("/upload", upload);
router.get("/:vehicleId", getDocumentById);

module.exports = router;
