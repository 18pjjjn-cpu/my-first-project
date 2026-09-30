const express = require('express');
const router = express.Router();

// Get weekly timetable
router.get('/week/:date', (req, res) => {
  try {
    const { date } = req.params;

    const timetable = {
      week: date,
      events: [
        {
          id: 1,
          type: 'lecture',
          title: 'Anatomy - Cardiovascular System',
          date: '2026-10-01',
          startTime: '09:00',
          endTime: '11:00',
          location: 'Lecture Hall A',
          gradMedicine: true,
          important: true
        },
        {
          id: 2,
          type: 'lab',
          title: 'Histology Practical',
          date: '2026-10-01',
          startTime: '13:00',
          endTime: '15:00',
          location: 'Lab 3',
          gradMedicine: false
        }
      ]
    };

    res.json(timetable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add event
router.post('/event', (req, res) => {
  try {
    const { title, type, date, startTime, endTime, location } = req.body;

    const event = {
      id: Date.now(),
      title,
      type,
      date,
      startTime,
      endTime,
      location,
      createdAt: new Date()
    };

    res.json({ success: true, event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update event
router.put('/event/:id', (req, res) => {
  try {
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete event
router.delete('/event/:id', (req, res) => {
  try {
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
