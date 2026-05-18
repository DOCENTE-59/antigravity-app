const express = require('express');
const router = express.Router();
const { getClassSummary } = require('../controllers/reportsController');

// GET /api/reports/class-summary
router.get('/reports/class-summary', getClassSummary);

module.exports = router;
