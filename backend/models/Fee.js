const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  amount: { type: Number, required: true },
  month: { type: String, required: true },
  status: { 
    type: String, 
    required: true, 
    enum: ['Bixiyay', 'Sugaya', 'Aan Bixin'], 
    default: 'Bixiyay' 
  },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Fee', feeSchema);