const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const connectDB = require('../config/db');

dotenv.config();

const seedSuperAdmin = async () => {
  try {
    await connectDB();

    const adminExists = await User.findOne({ email: 'admin@darulkarim.edu' });
    if (adminExists) {
      console.log('Super Adminhore ayaa loo abuuray.');
      process.exit();
    }

    await User.create({
      username: 'admin',
      email: 'admin@darulkarim.edu',
      password: 'Admin@123',
      role: 'Super Admin',
      status: 'Active'
    });

    console.log('Super Admin si guul leh ayaa loo abuuray (admin@darulkarim.edu / Admin@123)');
    process.exit();
  } catch (error) {
    console.error(`Khalad seed ah: ${error.message}`);
    process.exit(1);
  }
};

seedSuperAdmin();
