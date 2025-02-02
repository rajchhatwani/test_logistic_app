const Document = require("../models/Document");
const path = require("path");

exports.upload = async (req, res) => {
  try {
    if (!req.files || !req.files.document) {
      return res.status(400).send("No file uploaded");
    }

    const { vehicleId } = req.body;
    const document = req.files.document;
    const uploadPath = path.join(__dirname, "../uploads", document.name);

    // Save file to server
    document.mv(uploadPath, async (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      // Save file info to database
      const newDocument = new Document({
        vehicleId,
        documentName: document.name,
        documentPath: uploadPath,
      });
      await newDocument.save();

      res.status(200).send("Document uploaded successfully");
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

//get document by vehicle id

exports.getDocumentById = async (req, res) => {
  try {
    const documents = await Document.find({ vehicleId: req.params.vehicleId });
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).send("Server error");
  }
};
