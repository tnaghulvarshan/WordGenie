// find_models.js
const API_KEY = "AIzaSyDkCFDVD8sgr2cTdHnwMb-XDN6aMsWix04"; 

async function getModels() {
  console.log("🔍 Asking Google for available models...");
  
  try {
    // We use the direct API URL to list models
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
    const data = await response.json();

    if (data.error) {
        console.error("❌ API Error:", data.error.message);
        return;
    }

    console.log("\n✅ AVAILABLE MODELS FOR YOU:");
    console.log("----------------------------");
    
    // Filter to show only models that can generate content
    const validModels = data.models.filter(m => m.supportedGenerationMethods.includes("generateContent"));
    
    validModels.forEach(m => {
        // We only care about the name part after "models/"
        console.log(`Model Name: "${m.name.replace("models/", "")}"`);
    });
    console.log("----------------------------");
    console.log("👉 Pick one of the names above and put it in your code!");

  } catch (error) {
    console.error("Network Error:", error);
  }
}

getModels();