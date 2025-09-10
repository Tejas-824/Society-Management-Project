import mongoose from "mongoose";

const guardSalarySchema = new mongoose.Schema({
  guardName: {
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

const GuardSalary = mongoose.model("guardSalary", guardSalarySchema);

export default GuardSalary;
