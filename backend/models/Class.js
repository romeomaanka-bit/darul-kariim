const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    className: { type: String, required: true },
    classCode: { type: String, required: true, unique: true },
    teacherName: { type: String, required: true },
    schedule: { type: String, required: true },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);
