const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  admissionNumber: { type: String, required: true, unique: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  dateOfBirth: { type: Date, required: true },
  phone: { type: String, trim: true },
  email: { type: String, lowercase: true, trim: true },
  address: { type: String, required: true },
  className: { type: String, required: true },
  section: { type: String, default: '' },
  academicYear: { type: String, default: '2026-2027' },
  status: { type: String, enum: ['Active', 'Graduated', 'Suspended'], default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);