require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');

const seedSuperAdmin = async () => {
  try {
    await connectDB();

    const exists = await User.findOne({
      email: process.env.SUPER_ADMIN_EMAIL
    });

    if (exists) {
      console.log('⚠️ Super Admin already exists');
      process.exit();
    }

    const user = await User.create({
      name: 'Super Admin',
      email: process.env.SUPER_ADMIN_EMAIL,
      password: process.env.SUPER_ADMIN_PASSWORD,
      role: 'superadmin'
    });

    console.log('✅ Super Admin created:', user.email);
    process.exit();
  } catch (error) {
    console.error('❌ Failed to create Super Admin', error);
    process.exit(1);
  }
};

seedSuperAdmin();
