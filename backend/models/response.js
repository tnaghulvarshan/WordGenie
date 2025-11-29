// File: backend/models/response.js
const mongoose = require('mongoose');

const userResponseSchema = new mongoose.Schema({
    topic: { type: String, required: true },
    subject: { type: String, required: true },
    tone: { type: String, required: true },
    AIResponse: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserResponse', userResponseSchema);