const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const auth = require('../middleware/auth');

// Get all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single property
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create property (admin only)
router.post('/', auth, async (req, res) => {
  const property = new Property(req.body);
  try {
    const newProperty = await property.save();
    res.status(201).json(newProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update property (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    Object.assign(property, req.body);
    const updatedProperty = await property.save();
    res.json(updatedProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete property (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    await property.remove();
    res.json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 