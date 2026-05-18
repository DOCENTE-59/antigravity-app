const express = require('express');
const router = express.Router();
const { getStudentLogs, createStudentLog, updateTeacherFeedback } = require('../controllers/logsController');

// GET /api/students/:id/logs
router.get('/students/:id/logs', getStudentLogs);

// POST /api/logs
router.post('/logs', createStudentLog);

// PUT /api/logs/:id/feedback
router.put('/logs/:id/feedback', updateTeacherFeedback);

module.exports = router;
