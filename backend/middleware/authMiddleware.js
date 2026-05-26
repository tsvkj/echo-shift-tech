const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (
      !token ||
      !token.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    token = token.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Token failed",
    });
  }
};

module.exports = {
  protect,
};