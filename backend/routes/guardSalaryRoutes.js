const express = require("express");
const GuardSalary = require("../models/guardSalary");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const records = await GuardSalary.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch salary records" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { guardName, month, salaryAmount, paidDate, status } = req.body;

    const newRecord = new GuardSalary({
      guardName,
      month,
      salaryAmount,
      paidDate,
      status,
    });

    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(500).json({ error: "Failed to add salary record" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await GuardSalary.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Record not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update salary record" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await GuardSalary.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Record not found" });
    res.json({ message: "Record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete salary record" });
  }
});

module.exports = router;  
