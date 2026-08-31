const express = require('express');
const router = express.Router();
const Fee = require('../models/Fee'); // Hubi in model-kan la jiro ama magac kale la leeyahay
const { protect } = require('../middleware/auth');

// Helitaanka dhammaan lacagaha
router.get('/', protect, async (req, res) => {
    try {
        const fees = await Fee.find({}).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: fees.length,
            data: fees
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Diiwaangelinta lacag cusub
router.post('/', protect, async (req, res) => {
    try {
        const { studentName, amount, month, status } = req.body;
        
        const newFee = await Fee.create({
            studentName,
            amount,
            month,
            status: status || 'Bixiyay'
        });

        res.status(201).json({
            success: true,
            data: newFee
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;