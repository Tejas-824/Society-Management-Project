const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");

router.post("/", async (req, res) => {
  try {
    const newComplaint = new Complaint(req.body);
    const savedComplaint = await newComplaint.save();
    res.status(201).json(savedComplaint);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
