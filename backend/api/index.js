require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("../config/db");

const app = express();

let isConnected = false;

const connectDBSafe = async () => {
  if (isConnected) return;

  await connectDB();
  isConnected = true;
};

connectDBSafe();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", require("../routes/authRoutes"));
app.use("/api/projects", require("../routes/projectRoutes"));

// IMPORTANT: no app.listen()

module.exports = app;
