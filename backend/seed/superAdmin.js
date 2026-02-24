require("dotenv").config();
const User = require("../models/User");
const connectDB = require("../config/db");

const seedAdmin = async () => {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL || process.argv[2];
    const password = process.env.ADMIN_PASSWORD || process.argv[3];

    if (!email || !password) {
      console.log("❌ Provide email & password in .env or command line");
      process.exit(1);
    }

    const exists = await User.findOne({ email });

    if (exists) {
      console.log("⚠️ Admin already exists:", email);
      process.exit();
    }

    // ❌ NO hashing here
    const user = await User.create({
      name: "Admin",
      email,
      password, // model will hash automatically
      role: "superadmin",
    });

    console.log("✅ Admin created:", user.email);
    process.exit();
  } catch (error) {
    console.error("❌ Failed to create admin:", error);
    process.exit(1);
  }
};

seedAdmin();
