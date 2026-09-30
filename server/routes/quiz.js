const express = require('express');
const router = express.Router();

// Start quiz session
router.post('/start', (req, res) => {
  try {
    const { flashcardIds } = req.body;

    const quizSession = {
      id: Date.now(),
      startedAt: new Date(),
      flashcardIds,
      currentIndex: 0,
      score: 0,
      total: flashcardIds.length,
      answers: []
    };

    res.json({ success: true, quizSession });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit answer
router.post('/submit-answer', (req, res) => {
  try {
    const { quizId, flashcardId, isCorrect } = req.body;

    res.json({
      success: true,
      feedback: 'Answer recorded',
      nextQuestion: true
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// End quiz and save results
router.post('/end', (req, res) => {
  try {
    const { quizId, score, total } = req.body;

    const result = {
      quizId,
      score,
      total,
      percentage: (score / total) * 100,
      completedAt: new Date()
    };

    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get quiz history
router.get('/history', (req, res) => {
  try {
    res.json({ quizzes: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
