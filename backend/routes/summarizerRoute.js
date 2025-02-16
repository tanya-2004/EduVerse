// /backend/routes/summarizerRoute.js
const express = require('express');
const summarizeText = require('../utils/summarizer');
const router = express.Router();

// POST request to summarize text
router.post('/summarize', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ message: 'Text is required for summarization.' });
    }

    try {
        const summary = await summarizeText(text);
        res.json({ summary });
    } catch (error) {
        res.status(500).json({ message: 'Failed to summarize text' });
    }
});

module.exports = router;
