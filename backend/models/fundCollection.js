const mongoose = require("mongoose");

const FundCollectionSchema = new mongoose.Schema({
  memberName: { type: String, required: true },
  flatNo: { type: String, required: true },
  amount: { type: Number, required: true },
  category: {
    type: String,
    enum: ["Maintenance", "Festival", "Repair", "Security", "General"],
    required: true,
  },
  date: { type: Date, required: true },
  paymentMethod: {
    type: String,
    enum: ["Cash", "UPI", "Card", "Bank Transfer"],
    default: "Cash",
  },
  status: { type: String, enum: ["Paid", "Pending"], default: "Paid" },
});

module.exports = mongoose.model("fundCollection", FundCollectionSchema);
