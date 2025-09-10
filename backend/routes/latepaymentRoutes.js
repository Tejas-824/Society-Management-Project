const express = require("express");
const router = express.Router();
const LatePayment = require("../models/LatePayment");

router.post("/", async (req, res) => {
  try {
    const { name, flatNumber, amount, dueDate, status, remarks } = req.body;

    if (!name || !flatNumber || !amount || !dueDate || !status) {
      return res.status(400).json({ error: "All required fields must be filled." });
    }

    const latePayment = new LatePayment({
      name,
      flatNumber,
      amount,
      dueDate,
      status,
      remarks,
    });

    await latePayment.save();
    res.status(201).json(latePayment);
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const fines = await LatePayment.find().sort({ dueDate: -1 });
    res.json(fines);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch records" });
  }
});

module.exports = router;
