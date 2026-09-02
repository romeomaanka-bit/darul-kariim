const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Schema-ga loogu talagalay xogta ay soo gudbiyaan Macallinka, Waalidka, ama Maamulka
const aiFeedbackSchema = new mongoose.Schema({
    senderType: { type: String, required: true, enum: ['Macallin', 'Waalid', 'Maamul'] },
    senderName: { type: String, required: true },
    category: { type: String, required: true },
    message: { type: String, required: true }
}, { timestamps: true });

const AiFeedback = mongoose.models.AiFeedback || mongoose.model('AiFeedback', aiFeedbackSchema);

// 1. Soo qaado dhammaan fariimaha iyo warbixinta AI ee la falanqeeyay
router.get('/insights', async (req, res) => {
    try {
        const feedbacks = await AiFeedback.find().sort({ createdAt: -1 });

        // Halkaan ayuu AI-gu ku samayn karaa falanqeyn ku salaysan xogta ay soo direen
        let teacherNotes = [];
        let parentNotes = [];
        let recommendations = [
            "La soco xaaladda attendance-ka ardayda todobaadkan.",
            "Hubi in macallimiintu ay si Joogto ah u diiwaangeliyaan imtixaanaadka."
        ];

        feedbacks.forEach(item => {
            if (item.senderType === 'Macallin') {
                teacherNotes.push(`${item.senderName} (${item.category}): ${item.message}`);
            } else if (item.senderType === 'Waalid') {
                parentNotes.push(`${item.senderName} (${item.category}): ${item.message}`);
            }
        });

        if (teacherNotes.length === 0) teacherNotes.push("Wali macallimiintu ma soo gudbin xog cusub.");
        if (parentNotes.length === 0) parentNotes.push("Wali waalidiintu ma soo gudbin talooyin.");

        res.json({
            success: true,
            studentInsights: parentNotes,
            teacherInsights: teacherNotes,
            adminRecommendations: recommendations,
            allFeedbacks: feedbacks
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Cillad ayaa dhacday' });
    }
});

// 2. Ku dar xog cusub (oo ay soo dirayaan Macallinka, Waalidka, ama Maamulka)
router.post('/submit', async (req, res) => {
    try {
        const { senderType, senderName, category, message } = req.body;
        if (!senderType || !senderName || !category || !message) {
            return res.status(400).json({ success: false, message: 'Fadlan buuxi dhammaan meelaha banaan' });
        }

        const newFeedback = new AiFeedback({ senderType, senderName, category, message });
        await newFeedback.save();

        res.status(201).json({ success: true, message: 'Xogtaada si guul leh ayaa loo diray, waxaana aqriyay AI-ga maamulka!' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Lama kaydin karin xogta' });
    }
});

module.exports = router;