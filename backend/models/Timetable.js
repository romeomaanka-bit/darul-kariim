const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    tableClass: { type: String, required: true },
    tableDay: { type: String, required: true },
    tableSubject: { type: String, required: true },
    tableTeacher: { type: String, required: true },
    tableTime: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Timetable', timetableSchema);