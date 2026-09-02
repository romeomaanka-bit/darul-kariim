const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');
const { protect } = require('../middleware/auth');

// Hel dhammaan maaddooyinka
router.get('/', protect, async (req, res) => {
    try {
        const subjects = await Subject.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: subjects.length, data: subjects });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Ku dar maaddo cusub
router.post('/', protect, async (req, res) => {
    try {
        const newSubject = await Subject.create(req.body);
        res.status(201).json({ success: true, data: newSubject });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Wax ka beddel maaddo jirta
router.put('/:id', protect, async (req, res) => {
    try {
        const updatedSubject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedSubject) {
            return res.status(404).json({ success: false, message: 'Maadadan lama helin' });
        }
        res.status(200).json({ success: true, data: updatedSubject });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Tirtir dhammaan maaddooyinka (Waa inay ka horreysaa /:id)
router.delete('/all/delete', protect, async (req, res) => {
    try {
        await Subject.deleteMany({});
        res.status(200).json({ success: true, message: 'Dhammaan maaddooyinkii waa la tirtiray' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Tirtir hal maaddo
router.delete('/:id', protect, async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);
        if (!subject) {
            return res.status(404).json({ success: false, message: 'Maadadan lama helin' });
        }
        await subject.deleteOne();
        res.status(200).json({ success: true, message: 'Maadadii waa la tirtiray' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
