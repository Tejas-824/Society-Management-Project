const express = require("express");
const router = express.Router();
const WaterBill = require("../models/WaterBill");

router.post("/", async (req, res) => {
  try {
    const newBill = new WaterBill(req.body);
    const savedBill = await newBill.save();
    res.status(201).json(savedBill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const bills = await WaterBill.find();
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id/status", async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    if (!["Paid", "Unpaid"].includes(paymentStatus)) {
      return res.status(400).json({ message: "Invalid status. Must be Paid or Unpaid." });
    }

    const updatedBill = await WaterBill.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true }
    );

    if (!updatedBill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.json(updatedBill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
