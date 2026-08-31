const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

async function resetPassword() {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/darul-kariim';
    await mongoose.connect(mongoURI);
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt);

    let user = await User.findOne({ email: 'admin@darulkarim.edu' });

    if (user) {
      user.password = hashedPassword;
      await user.save();
      console.log('SUCCESS: Password-ka waxaa loo beddelay 123456');
    } else {
      await User.create({
        username: 'Administrator',
        email: 'admin@darulkarim.edu',
        password: hashedPassword,
        role: 'Super Admin'
      });
      console.log('SUCCESS: Admin cusub ayaa la abuuray (123456)');
    }
    process.exit();
  } catch (err) {
    console.error('Khalad ayaa dhacay:', err);
    process.exit(1);
  }
}

resetPassword();