const Fee = require('../models/Fee');

// Keenista dhammaan lacagaha la bixiyay
exports.getFees = async (req, res) => {
  try {
    const fees = await Fee.find().sort({ date: -1 });
    res.status(200).json({ success: true, data: fees });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Ku darida lacag cusub
exports.addFee = async (req, res) => {
  try {
    const { studentName, amount, month } = req.body;
    
    if (!studentName || !amount || !month) {
      return res.status(400).json({ success: false, message: 'Fadlan buuxi dhammaan meelaha banaan' });
    }

    const newFee = new Fee({ studentName, amount, month });
    await newFee.save();

    res.status(201).json({ success: true, message: 'Lacagta si guul leh ayaa loo diiwaangeliyay', data: newFee });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
