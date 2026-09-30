const express = require('express');
const router = express.Router();

// Get anatomy resources
router.get('/anatomy', (req, res) => {
  try {
    const resources = [
      {
        id: 1,
        title: 'Cardiovascular System - Interactive 3D Model',
        type: 'interactive',
        category: 'anatomy',
        description: 'Interactive 3D model of the heart and blood vessels',
        url: '/anatomy/cardiovascular',
        difficulty: 'intermediate'
      },
      {
        id: 2,
        title: 'Cell Structure Visualization',
        type: 'interactive',
        category: 'anatomy',
        description: 'Explore cell organelles and their functions',
        url: '/anatomy/cell-structure',
        difficulty: 'beginner'
      }
    ];

    res.json({ success: true, resources });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get graduate medicine preparation resources
router.get('/grad-medicine', (req, res) => {
  try {
    const resources = [
      {
        id: 1,
        title: 'Medical School Applications: Key Topics',
        type: 'article',
        importance: 'high',
        description: 'Essential knowledge areas for medical school applications',
        topics: ['Immunology', 'Genetics', 'Pathophysiology']
      },
      {
        id: 2,
        title: 'Clinical Case Studies',
        type: 'case-study',
        importance: 'high',
        description: 'Real clinical scenarios to prepare for medical school interviews'
      }
    ];

    res.json({ success: true, resources });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get IBMS further reading
router.get('/ibms', (req, res) => {
  try {
    const resources = [
      {
        id: 1,
        title: 'IBMS Standards of Practice',
        type: 'link',
        url: 'https://www.ibms.org/standards',
        description: 'Official IBMS standards and competency framework',
        relevance: 'Apprenticeship Standard'
      },
      {
        id: 2,
        title: 'Biomedical Science Journal',
        type: 'journal',
        url: 'https://www.ibms.org/learning',
        description: 'Latest research and professional updates from IBMS',
        relevance: 'Professional Development'
      },
      {
        id: 3,
        title: 'IBMS Diploma Syllabus',
        type: 'document',
        url: 'https://www.ibms.org/qualifications',
        description: 'Detailed syllabus for IBMS qualifications',
        relevance: 'Professional Qualification'
      }
    ];

    res.json({ success: true, resources });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all resources by category
router.get('/:category', (req, res) => {
  try {
    const { category } = req.params;
    res.json({ success: true, resources: [], category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
