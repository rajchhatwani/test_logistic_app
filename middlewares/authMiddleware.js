const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to authenticate user
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"]
    ? req.headers["authorization"].split(" ")[1]
    : null;

  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, id) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    next();
  });
};

// Middleware to authorize admin
const authorizeAdmin = async (req, res, next) => {
  const token = req.headers["authorization"]
    ? req.headers["authorization"].split(" ")[1]
    : null;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const roleVerify = await User.findOne(decoded.id);

  if (roleVerify.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  next();
};

module.exports = { authenticate, authorizeAdmin };
