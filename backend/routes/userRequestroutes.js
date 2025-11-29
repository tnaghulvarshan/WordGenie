const express = require('express');
const router = express.Router();
const { AIResponse } = require('../controllers/userRequestController');

router.post('/ai', AIResponse);
module.exports = router;
