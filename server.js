const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const authRoutes = require("./routes/auth");
const vehicleRoutes = require("./routes/vehicles");
const bookingRoutes = require("./routes/bookings");
const documentRoutes = require("./routes/documents");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/v1/auth", authRoutes);
app.use("/v1/vehicles", vehicleRoutes);
app.use("/v1/bookings", bookingRoutes);
app.use("/v1/documents", documentRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
