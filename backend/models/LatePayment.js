const mongoose = require("mongoose");

const LatePaymentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  flatNumber: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending",
  },
  remarks: {
    type: String,
    default: "",
  },
}, {
  timestamps: true, 
});

module.exports = mongoose.model("LatePayment", LatePaymentSchema);
