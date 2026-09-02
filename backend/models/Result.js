const mongoose = require('mongoose');

// Result Model
const resultSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    resultClass: { type: String, required: true },
    resultSubject: { type: String, required: true },
    examType: { type: String, required: true },
    score: { type: Number, required: true, min: 0, max: 100 }
}, { timestamps: true });

const Result = mongoose.model('Result', resultSchema);

// Timetable Model
const timetableSchema = new mongoose.Schema({
    tableClass: { type: String, required: true },
    tableDay: { type: String, required: true },
    tableSubject: { type: String, required: true },
    tableTeacher: { type: String, required: true },
    tableTime: { type: String, required: true }
}, { timestamps: true });

const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = { Result, Timetable };