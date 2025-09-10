const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
name: { type: String, required: true },
  flatNumber: { type: String, required: true },
  complaintType: { type: String, required: true },
  complaintDescription: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("Complaint", complaintSchema);