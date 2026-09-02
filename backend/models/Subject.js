const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    examName: {
        type: String,
        required: [true, 'Fadlan geli magaca imtixaanka']
    },
    examClass: {
        type: String,
        required: [true, 'Fadlan geli fasalka']
    },
    examSubject: {
        type: String,
        required: [true, 'Fadlan geli maadada imtixaanka']
    },
    examDays: {
        type: String,
        required: [true, 'Fadlan geli maalmaha/muddada imtixaanka']
    },
    examDate: {
        type: Date,
        required: [true, 'Fadlan geli taariikhda imtixaanka']
    }
}, { timestamps: true });

module.exports = mongoose.model('Exam', examSchema);