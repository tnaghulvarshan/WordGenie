const { GoogleGenerativeAI } = require("@google/generative-ai");

// 1. HARDCODE YOUR KEY HERE (Just for this test)
const API_KEY = "AIzaSyDkCFDVD8sgr2cTdHnwMb-XDN6aMsWix04"; 

const genAI = new GoogleGenerativeAI(API_KEY);

async function runTest() {
  try {
    console.log("1. Connecting to Gemini...");
    
    // We will try the most standard model first
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Say hello!";
    
    console.log("2. Sending prompt: " + prompt);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    console.log("--------------------------------");
    console.log("🎉 SUCCESS! Gemini replied:");
    console.log(response.text());
    console.log("--------------------------------");

  } catch (error) {
    console.error("❌ FAILED.");
    console.error("Error Message:", error.message);
    
    // If 404, it lists available models sometimes
    if (error.message.includes("404")) {
        console.log("\n💡 TIP: The model name might be wrong for your key.");
    }
  }
}

runTest();