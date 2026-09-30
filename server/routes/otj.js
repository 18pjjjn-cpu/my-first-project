const express = require('express');
const router = express.Router();

// Record off-the-job training
router.post('/log', (req, res) => {
  try {
    const {
      date,
      activityType,
      description,
      hoursSpent,
      competenciesCovered,
      evidence,
      userId
    } = req.body;

    const otjEntry = {
      id: Date.now(),
      date,
      activityType,
      description,
      hoursSpent,
      competenciesCovered: competenciesCovered || [],
      evidence: evidence || [],
      userId,
      status: 'draft',
      createdAt: new Date()
    };

    res.json({
      success: true,
      entry: otjEntry,
      message: 'Off-the-job training logged'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get OTJ logs for user
router.get('/', (req, res) => {
  try {
    const logs = [
      {
        id: 1,
        date: '2026-09-25',
        activityType: 'Research',
        description: 'Studied immunology concepts for graduate medical school applications',
        hoursSpent: 3,
        competenciesCovered: ['Knowledge', 'Professional Development'],
        status: 'submitted'
      }
    ];

    res.json({ success: true, logs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update OTJ entry
router.put('/:id', (req, res) => {
  try {
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete OTJ entry
router.delete('/:id', (req, res) => {
  try {
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get OTJ stats/summary
router.get('/summary', (req, res) => {
  try {
    const summary = {
      totalHours: 150,
      requiredHours: 300,
      entriesCount: 45,
      competenciesCovered: ['Knowledge', 'Professional Development', 'Technical Skills']
    };

    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
