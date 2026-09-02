const express = require('express');
const router = express.Router();
const Class = require('../models/Class');
const { protect } = require('../middleware/auth');

// Helitaanka dhammaan fasallada (GET)
router.get('/', protect, async (req, res) => {
    try {
        const classes = await Class.find({}).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: classes.length,
            data: classes
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Abuurista fasal cusub (POST)
router.post('/', protect, async (req, res) => {
    try {
        req.body.classCode = req.body.classCode || 'CLS-' + Math.floor(1000 + Math.random() * 9000);
        const newClass = await Class.create(req.body);
        res.status(201).json({ success: true, data: newClass });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Wax-ka-beddelka fasalka (PUT)
router.put('/:id', protect, async (req, res) => {
    try {
        const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { 
            new: true, 
            runValidators: true 
        });
        if (!updatedClass) {
            return res.status(404).json({ success: false, message: 'Fasalkan lama helin' });
        }
        res.status(200).json({ success: true, data: updatedClass });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// ⚠️ MUHIM: Tirtiridda dhammaan (Waa inay KA HORREYSAA router.delete('/:id'))
router.delete('/all/delete', protect, async (req, res) => {
    try {
        await Class.deleteMany({});
        res.status(200).json({ success: true, message: 'Dhammaan fasalladii waa la tirtiray' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Tirtiridda fasalka kelidii ah (DELETE)
router.delete('/:id', protect, async (req, res) => {
    try {
        const classItem = await Class.findById(req.params.id);
        if (!classItem) {
            return res.status(404).json({ success: false, message: 'Fasalkan lama helin' });
        }
        await classItem.deleteOne();
        res.status(200).json({ success: true, message: 'Fasalkii waa la tirtiray' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;