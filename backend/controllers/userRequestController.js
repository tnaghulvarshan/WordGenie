// controllers/userRequestController.js
const UserResponse = require("../models/response");
const { generateMessage } = require("../utils/geminiApi"); // Import your new helper

exports.AIResponse = async (req, res) => {
  try {
    console.log("BACKEND RECEIVED:", req.body);
    // 1. Get userId along with other data
    const { topic, subject, tone, userId } = req.body; 

    // Validate userId exists
    if (!userId) {
        return res.status(401).json({ message: "User ID is missing. Please log in." });
    }
    
    // ... (Validation and Prompt Generation remain the same) ...

    // Call your helper function
    const aiText = await generateMessage(topic, subject, tone);

    // 2. Save with the User ID
    const newEntry = new UserResponse({
      userId: userId, // <--- SAVING THE ID
      topic,
      subject,
      tone,
      AIResponse: aiText
    });
    
    await newEntry.save();

    res.status(200).json({ response: aiText });

  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};