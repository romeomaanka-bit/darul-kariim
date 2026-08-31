const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Beddelida Username-ka
exports.updateUsername = async (req, res) => {
  try {
    const { newUsername } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'Isticmaalaha lama helin' });
    }

    user.username = newUsername;
    await user.save();

    res.status(200).json({ success: true, message: 'Username-ka si guul leh ayaa loo beddelay' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Beddelida Password-ka
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'Isticmaalaha lama helin' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Erayga sirta ah ee hadda waa qaldan yahay' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ success: true, message: 'Password-ka si guul leh ayaa loo beddelay' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};