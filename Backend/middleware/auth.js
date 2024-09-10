const jwt = require("jsonwebtoken");
const User = require("../model/User");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    // req.id = decoded;
    // userId = decoded.user.id;
    if (!req.user) {
      console.error("User not found with ID:", decoded.id);
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};
