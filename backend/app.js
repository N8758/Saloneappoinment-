require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/Salon")
    .then(() => console.log("✅ Database connected"))
    .catch((error) => console.error("❌ MongoDB Connection Error:", error));

// ✅ Fix CORS Issue
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Allow frontend access

app.use(express.json()); // Parses incoming JSON requests

// ✅ Routes
const salonRoutes = require("./routes/salonRoute");
app.use("/salon", salonRoutes);

// ✅ Default Route
app.get("/", (req, res) => {
    res.send("🚀 Server running at port " + PORT);
});

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
