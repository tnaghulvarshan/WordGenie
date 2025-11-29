const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const generateMessage = async (topic, subject, tone) => {
  try {
    // Safety check
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("API Key is missing in .env");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // ✅ FIX: Using the model available in your list
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Write a ${tone} ${topic} about "${subject}". Keep it concise.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error("❌ GEMINI ERROR:", error);
    throw error;
  }
};

module.exports = { generateMessage };