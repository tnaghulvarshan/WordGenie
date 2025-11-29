// controllers/userRequestController.js
const UserResponse = require("../models/response");
const { generateMessage } = require("../utils/geminiApi"); // Import your new helper

exports.AIResponse = async (req, res) => {
  try {
    const { topic, subject, tone } = req.body;

    // 1. Validate
    if (!topic || !subject || !tone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Call your separate API file
    // The controller doesn't need to know HOW Gemini works, just that it returns text.
    const aiText = await generateMessage(topic, subject, tone);

    // 3. Save to DB
    const newEntry = new UserResponse({
      topic,
      subject,
      tone,
      AIResponse: aiText
    });
    
    await newEntry.save();

    // 4. Send Response
    res.status(200).json({ response: aiText });

  } catch (error) {
    console.error("Controller Error:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};