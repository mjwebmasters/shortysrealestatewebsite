const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://appuser:app123@mongodb:27017/realestate?authSource=admin';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error:', err));

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Performing graceful shutdown...');
  mongoose.connection.close()
    .then(() => {
      console.log('MongoDB connection closed.');
      process.exit(0);
    })
    .catch(err => {
      console.error('Error during shutdown:', err);
      process.exit(1);
    });
});

// Routes (to be implemented)
app.use('/api/properties', require('./routes/properties'));
app.use('/api/mortgages', require('./routes/mortgages'));
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 