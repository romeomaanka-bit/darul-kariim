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

// Isticmaal habkan si uusan Error-kani u soo laaban
module.exports = mongoose.models.Exam || mongoose.model('Exam', examSchema);