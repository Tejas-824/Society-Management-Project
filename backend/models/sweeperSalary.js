import mongoose from "mongoose";

const sweeperSalarySchema = new mongoose.Schema({
  sweeperName: {
    type: String,
    required: true,
    trim: true,
  },
  month: {
    type: String,
    required: true, 
  },
  salaryAmount: {
    type: Number,
    required: true,
  },
  paidDate: {
    type: String, 
    default: null,
  },
  status: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending",
  },
}, { timestamps: true });

const SweeperSalary = mongoose.model("sweeperSalary", sweeperSalarySchema);

export default SweeperSalary;
