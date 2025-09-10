const express = require("express");
const router = express.Router();
const Improvement = require("../models/Improvement");

router.post("/", async (req, res) => {
  try {
    const newImprovement = new Improvement(req.body);
    const savedImprovement = await newImprovement.save();
    res.status(201).json(savedImprovement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const improvements = await Improvement.find().sort({ createdAt: -1 });
    res.json(improvements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const improvement = await Improvement.findById(req.params.id);
    if (!improvement) return res.status(404).json({ message: "Improvement not found" });
    res.json(improvement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedImprovement = await Improvement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedImprovement) return res.status(404).json({ message: "Improvement not found" });
    res.json(updatedImprovement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedImprovement = await Improvement.findByIdAndDelete(req.params.id);
    if (!deletedImprovement) return res.status(404).json({ message: "Improvement not found" });
    res.json({ message: "Improvement deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
