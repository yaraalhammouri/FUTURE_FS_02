const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

// GET all leads
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new lead
router.post("/", async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE lead status
router.put("/:id", async (req, res) => {
  try {
    const updateData = {};

    if (req.body && req.body.status !== undefined) {
      updateData.status = req.body.status;
    }

    if (req.body && req.body.notes !== undefined) {
      updateData.notes = req.body.notes;
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedLead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE lead
router.delete("/:id", async (req, res) => {
    try {
      await Lead.findByIdAndDelete(req.params.id);
      res.json({ message: "Lead deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;