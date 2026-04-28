const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Unauthorized HTTP, Token not provided",
    });
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userData = await User.findById(decoded.userId).select("-password");

    if (!userData) {
      return res.status(401).json({ message: "User not found" });
    }

    req.token = token;
    req.user = userData;
    req.userID = userData._id;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized. Invalid token.",
    });
  }
};

module.exports = authMiddleware;
