const express = require('express');
const router = express.Router();
const Exam = require('../models/Exam');
const { protect } = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
    try {
        const exams = await Exam.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: exams });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/', protect, async (req, res) => {
    try {
        const newExam = await Exam.create(req.body);
        res.status(201).json({ success: true, data: newExam });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.put('/:id', protect, async (req, res) => {
    try {
        const updatedExam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: updatedExam });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.delete('/all/delete', protect, async (req, res) => {
    try {
        await Exam.deleteMany({});
        res.status(200).json({ success: true, message: 'All exams deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/:id', protect, async (req, res) => {
    try {
        await Exam.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Exam deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
