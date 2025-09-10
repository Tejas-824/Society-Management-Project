const express = require("express");
const router = express.Router();
const Repair = require("../models/Repairs");

router.get("/", async (req, res) => {
  try {
    const repairs = await Repair.find().sort({ createdAt: -1 });
    res.json(repairs);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, category, message, date, priority } = req.body;

    if (!title || !category || !message || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRepair = new Repair({
      title,
      category,
      message,
      date,
      priority,
    });

    const savedRepair = await newRepair.save();
    res.status(201).json(savedRepair);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedRepair = await Repair.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedRepair) {
      return res.status(404).json({ message: "Repair request not found" });
    }

    res.json(updatedRepair);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedRepair = await Repair.findByIdAndDelete(req.params.id);

    if (!deletedRepair) {
      return res.status(404).json({ message: "Repair request not found" });
    }

    res.json({ message: "Repair request deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
