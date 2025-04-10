const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    address: String,
    city: String,
    state: String,
    zipCode: String
  },
  features: {
    bedrooms: Number,
    bathrooms: Number,
    squareFeet: Number,
    yearBuilt: Number
  },
  propertyType: {
    type: String,
    enum: ['Single Family', 'Multi Family', 'Condo', 'Townhouse', 'Land'],
    required: true
  },
  images: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['Available', 'Pending', 'Sold'],
    default: 'Available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Property', propertySchema); 