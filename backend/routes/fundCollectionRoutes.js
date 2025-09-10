const express = require("express");
const router = express.Router();
const FundCollection = require("../models/fundCollection");

router.post("/", async (req, res) => {
  try {
    const newFund = new FundCollection(req.body);
    const savedFund = await newFund.save();
    res.status(201).json(savedFund);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const funds = await FundCollection.find();
    res.json(funds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
