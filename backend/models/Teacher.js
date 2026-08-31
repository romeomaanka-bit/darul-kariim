const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  teacherId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, lowercase: true, trim: true },
  subject: { type: String, required: true }, // Tusaale: Xisaab, Carabi
  qualification: { type: String }, // Tusaale: Shahaadada Degree / Master
  address: { type: String, required: true },
  status: { type: String, enum: ['Active', 'On Leave', 'Resigned'], default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);
