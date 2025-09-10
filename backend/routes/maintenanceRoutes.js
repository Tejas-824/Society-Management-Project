const express = require("express");
const router = express.Router();
const Maintenance = require("../models/Maintenance"); 

router.get("/", async (req, res) => {
  try {
    const requests = await Maintenance.find().sort({ createdAt: -1 });
    res.json(requests);
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

    const newRequest = new Maintenance({
      title,
      category,
      message,
      date,
      priority,
    });

    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedRequest = await Maintenance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json(updatedRequest);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedRequest = await Maintenance.findByIdAndDelete(req.params.id);

    if (!deletedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json({ message: "Request deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
