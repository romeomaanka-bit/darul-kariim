const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Timetable Schema & Model
const timetableSchema = new mongoose.Schema({
    tableClass: { type: String, required: true },
    tableDay: { type: String, required: true },
    tableSubject: { type: String, required: true },
    tableTeacher: { type: String, required: true },
    tableTime: { type: String, required: true }
}, { timestamps: true });

const Timetable = mongoose.models.Timetable || mongoose.model('Timetable', timetableSchema);

// 1. Soo qaado dhammaan jadwalka
router.get('/', async (req, res) => {
    try {
        const timetables = await Timetable.find().sort({ createdAt: -1 });
        res.json({ success: true, data: timetables });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Cillad ayaa dhacday lama soo qaadi karo jadwalka' });
    }
});

// 2. Ku dar jadwal cusub
router.post('/', async (req, res) => {
    try {
        const { tableClass, tableDay, tableSubject, tableTeacher, tableTime } = req.body;
        
        if (!tableClass || !tableDay || !tableSubject || !tableTeacher || !tableTime) {
            return res.status(400).json({ success: false, message: 'Fadlan buuxi dhammaan xogta jadwalka' });
        }

        const newTable = new Timetable({ tableClass, tableDay, tableSubject, tableTeacher, tableTime });
        await newTable.save();
        
        res.status(201).json({ success: true, data: newTable });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Lama kaydin karin jadwalka' });
    }
});

// 3. Wax ka beddel jadwalka
router.put('/:id', async (req, res) => {
    try {
        const updated = await Timetable.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) {
            return res.status(404).json({ success: false, message: 'Jadwalkan lama helin' });
        }
        res.json({ success: true, data: updated });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Lama cusboonaysiin karo jadwalka' });
    }
});

// 4. Tirtir jadwal
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Timetable.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Jadwalkan lama helin' });
        }
        res.json({ success: true, message: 'Waa la tirtiray' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Lama tirtiri karo jadwalka' });
    }
});

module.exports = router;
