const express = require('express');
const router = express.Router();
const { AIResponse , getUserHistory,deleteHistory  } = require('../controllers/userRequestController');

router.post('/ai', AIResponse);
router.get('/history/:userId', getUserHistory);
router.delete('/history/:id', deleteHistory);
module.exports = router;
