const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const { protect } = require('../middleware/auth');

// Helitaanka dhammaan ardayda (GET)
router.get('/', protect, async (req, res) => {
    try {
        const students = await Student.find({});
        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Diiwaangelinta arday cusub (POST)
router.post('/', protect, async (req, res) => {
    try {
        // Si otomaatig ah u buuxi beeraha qasabka ah haddii aysan foomka ka imaan
        req.body.studentId = req.body.studentId || 'STU-' + Math.floor(1000 + Math.random() * 9000);
        req.body.admissionNumber = req.body.admissionNumber || 'ADM-' + Math.floor(1000 + Math.random() * 9000);
        req.body.className = req.body.className || req.body.class || 'General';
        req.body.dateOfBirth = req.body.dateOfBirth || new Date();

        const student = await Student.create(req.body);
        res.status(201).json({
            success: true,
            data: student
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;