const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/darul-karim';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'ADMIN' }
});

const User = mongoose.model('User', userSchema);

async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB waxaa lagu guulaystay in lagu xiro.');

    // Password-ka oo la hash-gareeyay
    const hashedPassword = await bcrypt.hash('1234', 10);

    // Waxaan isticmaaleynaa username "mamule"
    const updatedUser = await User.findOneAndUpdate(
      { username: 'mamule' },
      { 
        email: 'mamule@darulkarim.edu',
        username: 'mamule',
        password: hashedPassword,
        role: 'ADMIN'
      },
      { upsert: true, new: true }
    );

    console.log('Admin-kii si guul leh ayaa loo beddelay!');
    console.log('Username: mamule');
    console.log('Password: 1234');
    
    process.exit(0);
  } catch (error) {
    console.error('Cilad ayaa dhacday:', error);
    process.exit(1);
  }
}

run();