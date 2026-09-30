const express = require('express');
const router = express.Router();

// Generate flashcards from notes using Claude API
router.post('/generate', async (req, res) => {
  try {
    const { notesId, notesText } = req.body;

    if (!notesText) {
      return res.status(400).json({ error: 'No text provided' });
    }

    // TODO: Call Claude API to generate flashcards
    // Sample response structure:
    const flashcards = [
      {
        id: 1,
        front: 'What is the function of mitochondria?',
        back: 'Energy production through ATP synthesis',
        notesId,
        createdAt: new Date()
      }
    ];

    res.json({
      success: true,
      flashcards,
      message: `Generated ${flashcards.length} flashcards`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get flashcards
router.get('/:notesId', (req, res) => {
  try {
    res.json({ flashcards: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update flashcard
router.put('/:id', (req, res) => {
  try {
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete flashcard
router.delete('/:id', (req, res) => {
  try {
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
