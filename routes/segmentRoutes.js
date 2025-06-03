const express = require('express');
const router = express.Router();
const { addSegment, getSegments, previewSegmentAudience,getSegmentById } = require('../controllers/segmentController');
const authenticateUser = require('../utils/authMiddleware');

router.post('/', authenticateUser, addSegment);
router.get('/', authenticateUser, getSegments);
router.get('/:id', authenticateUser, getSegmentById);

// For preview
router.post('/preview', authenticateUser, previewSegmentAudience);
router.get('/preview', authenticateUser, previewSegmentAudience);


module.exports = router;
