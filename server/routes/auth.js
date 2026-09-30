const express = require('express');
const router = express.Router();

// Register
router.post('/register', (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // TODO: Hash password and save to database
    const user = {
      id: Date.now(),
      email,
      fullName,
      createdAt: new Date()
    };

    res.json({
      success: true,
      user,
      message: 'User registered successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // TODO: Verify credentials and create JWT token
    const token = 'dummy-jwt-token';
    const user = {
      id: 1,
      email,
      fullName: 'Student Name'
    };

    res.json({
      success: true,
      token,
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get current user
router.get('/me', (req, res) => {
  try {
    // TODO: Verify JWT and get user from database
    res.json({
      user: {
        id: 1,
        email: 'student@university.ac.uk',
        fullName: 'Student Name'
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
