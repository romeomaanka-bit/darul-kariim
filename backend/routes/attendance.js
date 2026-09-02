const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance'); // Hubi inuu magaca Model-kaagu sax yahay
const { protect } = require('../middleware/auth');

// Helitaanka dhammaan xogta xadirinta (GET)
router.get('/', protect, async (req, res) => {
    try {
        const attendanceList = await Attendance.find({}).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: attendanceList.length,
            data: attendanceList
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Diiwaangelinta xadirin cusub (POST)
router.post('/', protect, async (req, res) => {
    try {
        const attendance = await Attendance.create(req.body);
        res.status(201).json({
            success: true,
            data: attendance
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// Tirtiridda xadirinta (DELETE)
router.delete('/:id', protect, async (req, res) => {
    try {
        const attendance = await Attendance.findById(req.params.id);
        if (!attendance) {
            return res.status(404).json({ 
                success: false, 
                message: 'Xadirintaan lama helin' 
            });
        }
        await attendance.deleteOne();
        res.status(200).json({ 
            success: true, 
            message: 'Xadirintii waa la tirtiray' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

module.exports = router;