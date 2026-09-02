const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: [true, 'Fadlan geli magaca ardayga']
    },
    status: {
        type: String,
        enum: ['Jooga', 'Maqan', 'Soo Daahay', 'Cududaar'],
        default: 'Jooga'
    },
    date: {
        type: Date,
        required: [true, 'Fadlan geli taariikhda']
    }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);
