const mongoose = require('mongoose');

const mortgageSchema = new mongoose.Schema({
  applicant: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String
    }
  },
  loanDetails: {
    loanAmount: {
      type: Number,
      required: true
    },
    downPayment: {
      type: Number,
      required: true
    },
    loanTerm: {
      type: Number,
      required: true
    },
    interestRate: {
      type: Number,
      required: true
    },
    loanType: {
      type: String,
      enum: ['Conventional', 'FHA', 'VA', 'USDA'],
      required: true
    }
  },
  financialInfo: {
    annualIncome: Number,
    employmentStatus: String,
    creditScore: Number,
    monthlyDebt: Number
  },
  status: {
    type: String,
    enum: ['Pending', 'In Review', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  documents: [{
    type: String,
    description: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Mortgage', mortgageSchema); 