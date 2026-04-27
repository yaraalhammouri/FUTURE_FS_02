const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const leadRoutes = require("./routes/leadRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/leads", leadRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});