const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/darul-karim';

const fixUser = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected...');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt);

    const updatedUser = await User.findOneAndUpdate(
      { username: { $regex: /^mamule$/i } },
      { 
        password: hashedPassword,
        status: 'Active'
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    console.log('User-kii waa la hagaajiyay:', updatedUser.username);
    process.exit(0);
  } catch (error) {
    console.error('Cillad ayaa dhacday:', error);
    process.exit(1);
  }
};

fixUser();