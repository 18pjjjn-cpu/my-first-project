const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const upload = multer({
  dest: path.join(__dirname, '../uploads'),
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PowerPoint files are allowed'));
    }
  }
});

// Upload PowerPoint notes
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const fileData = {
      id: Date.now(),
      filename: req.body.title || req.file.originalname,
      filepath: req.file.path,
      mimetype: req.file.mimetype,
      uploadedAt: new Date(),
      userId: req.body.userId,
      extractedText: req.body.extractedText || ''
    };

    res.json({
      success: true,
      file: fileData,
      message: 'File uploaded successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's uploaded notes
router.get('/', (req, res) => {
  try {
    // TODO: Fetch from database
    res.json({ notes: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete note
router.delete('/:id', (req, res) => {
  try {
    // TODO: Delete from database and file system
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
