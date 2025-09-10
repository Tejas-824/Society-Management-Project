const mongoose = require("mongoose");

const electricityBillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  flatNumber: { type: String, required: true },
  billAmount: { type: Number, required: true }, 
  dueDate: { type: Date, required: true },
  paymentStatus: { 
    type: String, 
    enum: ["Unpaid", "Paid"], 
    default: "Unpaid" 
  }
});

module.exports = mongoose.model("electricityBill", electricityBillSchema);