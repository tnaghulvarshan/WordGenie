// File: backend/models/response.js
const mongoose = require('mongoose');

const userResponseSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // This must match the name of your User model
        required: true 
    },
    topic: { type: String, required: true },
    subject: { type: String, required: true },
    tone: { type: String, required: true },
    AIResponse: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserResponse', userResponseSchema);