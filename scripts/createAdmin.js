const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/realestate-broker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error:', err));

const createAdminUser = async () => {
  try {
    // First, delete any existing admin user
    await User.deleteOne({ email: 'admin@realestate.com' });

    // Create new admin user with hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@realestate.com',
      password: hashedPassword,
      role: 'admin'
    });

    await adminUser.save();
    console.log('Admin user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser(); 