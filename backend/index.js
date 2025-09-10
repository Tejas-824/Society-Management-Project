const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import routes
// const userRoutes = require("./routes/userRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const latePaymentRoutes = require("./routes/latePaymentRoutes");
const guardSalaryRoutes = require("./routes/guardSalaryRoutes.js");
const sweeperSalaryRoutes = require("./routes/sweeperSalaryRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const repairRoutes = require("./routes/repairRoutes");
const improvementRoutes = require("./routes/improvementRoutes");
const fundCollectionRoutes = require("./routes/fundCollectionRoutes");
const electricityBillRoutes = require("./routes/electricityBillRoutes.js");
const waterBillRoutes = require("./routes/waterBillRoutes.js");
// const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use("/api/users", userRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/late-payment", latePaymentRoutes);
app.use("/api/guard-salary", guardSalaryRoutes);
app.use("/api/sweeper-salary", sweeperSalaryRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/repairs", repairRoutes); 
app.use("/api/building-improvements", improvementRoutes); 
app.use("/api/fund-collection", fundCollectionRoutes);
app.use("/api/electricity-bill", electricityBillRoutes);
app.use("/api/water-bill", waterBillRoutes);
// app.use("/api/payments", paymentRoutes); //incomplete


// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected!");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log("MongoDB Connection Error:", err));
