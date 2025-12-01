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
// ... (Your existing imports and AIResponse function are up here) ...

 // ... existing functions ...

// NEW: Delete a specific message
exports.deleteHistory = async (req, res) => {
  try {
    const { id } = req.params; // Get the message ID from URL

    await UserResponse.findByIdAndDelete(id);

    res.status(200).json({ message: "Draft deleted successfully" });
  } catch (error) {
    console.error("Error deleting draft:", error);
    res.status(500).json({ message: "Failed to delete draft" });
  }
};
exports.getUserHistory = async (req, res) => {
  try {
    const { userId } = req.params; // We get the ID from the URL

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // 1. Find all documents with this userId
    // 2. Sort them by 'createdAt' in descending order (-1) so newest is first
    const history = await UserResponse.find({ userId: userId }).sort({ createdAt: -1 });

    res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching drafts:", error);
    res.status(500).json({ message: "Failed to fetch drafts" });
  }
};