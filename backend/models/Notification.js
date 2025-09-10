const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: {
    type: String,
    enum: ["Festival", "Maintenance", "Security", "Event", "General"],
    required: true,
  },
  message: { type: String, required: true },
  date: { type: Date, required: true },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low",
  },
}, { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema);
