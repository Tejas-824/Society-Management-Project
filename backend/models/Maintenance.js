const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["Plumbing", "Electrical", "Cleaning", "Miscellaneous"],
      required: true,
    },
    message: { type: String, required: true }, 
    date: { type: Date, required: true }, 
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Maintenance", maintenanceSchema);
