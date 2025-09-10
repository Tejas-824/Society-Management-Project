const express = require("express");
const SweeperSalary = require("../models/sweeperSalary");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const records = await SweeperSalary.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sweeper salary records" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { sweeperName, month, salaryAmount, paidDate, status } = req.body;

    const newRecord = new SweeperSalary({
      sweeperName,
      month,
      salaryAmount,
      paidDate,
      status,
    });

    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(500).json({ error: "Failed to add sweeper salary record" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await SweeperSalary.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Record not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update sweeper salary record" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await SweeperSalary.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Record not found" });
    res.json({ message: "Record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete sweeper salary record" });
  }
});

module.exports = router; 
