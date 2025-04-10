const express = require('express');
const router = express.Router();
const Mortgage = require('../models/Mortgage');
const auth = require('../middleware/auth');

// Get all mortgage applications (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const mortgages = await Mortgage.find();
    res.json(mortgages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single mortgage application
router.get('/:id', auth, async (req, res) => {
  try {
    const mortgage = await Mortgage.findById(req.params.id);
    if (!mortgage) {
      return res.status(404).json({ message: 'Mortgage application not found' });
    }
    res.json(mortgage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create mortgage application
router.post('/', async (req, res) => {
  const mortgage = new Mortgage(req.body);
  try {
    const newMortgage = await mortgage.save();
    res.status(201).json(newMortgage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update mortgage application status (admin only)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const mortgage = await Mortgage.findById(req.params.id);
    if (!mortgage) {
      return res.status(404).json({ message: 'Mortgage application not found' });
    }
    mortgage.status = req.body.status;
    const updatedMortgage = await mortgage.save();
    res.json(updatedMortgage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete mortgage application (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const mortgage = await Mortgage.findById(req.params.id);
    if (!mortgage) {
      return res.status(404).json({ message: 'Mortgage application not found' });
    }
    await mortgage.remove();
    res.json({ message: 'Mortgage application deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 