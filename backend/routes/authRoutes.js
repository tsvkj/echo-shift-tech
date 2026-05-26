const express = require("express");

const router = express.Router();

const {
  login,
} = require("../controllers/authController");

const {
  protect,
} = require("../middleware/authMiddleware");

router.post("/login", login);

router.get(
  "/me",
  protect,
  async (req, res) => {
    res.json({
      message: "Authorized",
      user: req.user,
    });
  }
);

module.exports = router;