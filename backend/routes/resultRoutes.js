const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Result Schema & Model (Haddii aadan fayl gooni ah u samayn model-ka)
const resultSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    resultClass: { type: String, required: true },
    resultSubject: { type: String, required: true },
    examType: { type: String, required: true },
    score: { type: Number, required: true, min: 0, max: 100 }
}, { timestamps: true });

const Result = mongoose.models.Result || mongoose.model('Result', resultSchema);

// 1. Soo qaado dhammaan natiijooyinka
router.get('/', async (req, res) => {
    try {
        const results = await Result.find().sort({ createdAt: -1 });
        res.json({ success: true, data: results });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Cillad ayaa dhacday lama soo qaadi karo xogta' });
    }
});

// 2. Gali natiijo cusub
router.post('/', async (req, res) => {
    try {
        const { studentName, resultClass, resultSubject, examType, score } = req.body;
        
        if (!studentName || !resultClass || !resultSubject || !examType || score === undefined) {
            return res.status(400).json({ success: false, message: 'Fadlan buuxi dhammaan xogta la rabo' });
        }

        const newResult = new Result({ studentName, resultClass, resultSubject, examType, score });
        await newResult.save();
        
        res.status(201).json({ success: true, data: newResult });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Lama kaydin karin natiijada' });
    }
});

// 3. Wax ka beddel natiijada
router.put('/:id', async (req, res) => {
    try {
        const updated = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) {
            return res.status(404).json({ success: false, message: 'Natiijadan lama helin' });
        }
        res.json({ success: true, data: updated });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Lama cusboonaysiin karo natiijada' });
    }
});

// 4. Tirtir natiijo
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Result.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Natiijadan lama helin' });
        }
        res.json({ success: true, message: 'Waa la tirtiray' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Lama tirtiri karo natiijada' });
    }
});

module.exports = router;
