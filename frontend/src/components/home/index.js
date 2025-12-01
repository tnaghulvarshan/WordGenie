import React, { useState } from "react";
import axios from "axios";
import lamp from "./img/lamp.jpg";
// import icon1 from "../img/icon1.png";

function Home() {
  // 1. STATE: Variables to hold your data
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("");
  const [tone, setTone] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  
  // NEW: State to handle the copy button feedback
  const [copied, setCopied] = useState(false);

  // 2. THE ENGINE: Function to call your Backend
  const handleGenerate = async () => {
    // --- DEBUGGING START ---
    console.log("MY API URL IS:", process.env.REACT_APP_Backend_API);
    const storedUser = localStorage.getItem("user");
    console.log("1. Raw LocalStorage:", storedUser);

    if (!storedUser) {
      alert("No user found in local storage. Please log in.");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    console.log("2. Parsed Object:", parsedUser);

    // CRITICAL CHECK: Extract the ID
    const userId = parsedUser.id || parsedUser._id;
    console.log("3. Extracted User ID:", userId);
    // --- DEBUGGING END ---

    if (!userId) {
        alert("Found user data, but NO ID. Check console.");
        return;
    }

    // Validation
    if (!topic || !subject || !tone) {
        alert("Please fill in all fields!");
        return;
    }

    setLoading(true);
    setCopied(false); // Reset copy status when generating new
    setOutput("Generating your message... please wait.");
    
    try {
      // 3. SEND REQUEST TO BACKEND
      // ⚠️ CRITICAL FIX: The characters below are BACKTICKS (`), not single quotes (')
      // They are located above the TAB key on your keyboard.
      const res = await axios.post(`${process.env.REACT_APP_Backend_API}/request/ai`, {
        userId: userId, 
        topic: topic,
        subject: subject,
        tone: tone
      });

      // 4. UPDATE UI WITH RESPONSE
      setOutput(res.data.response); 

    } catch (error) {
      console.error("Error connecting to server:", error);
      setOutput("Error: Could not connect to the backend. Is it running on port 5000?");
    } finally {
      setLoading(false);
    }
  };

  // NEW: Function to handle copying text
  const handleCopy = () => {
    if (!output) return;
    
    // Write text to clipboard
    navigator.clipboard.writeText(output);
    
    // Update state to show "Copied!"
    setCopied(true);
    
    // Reset back to "Copy" after 2 seconds
    setTimeout(() => {
        setCopied(false);
    }, 2000);
  };

  // 3. THE UI
  return (
    <div className="container-fluid">
      {/* Hero Section */}
      <div className="row align-items-center justify-content-center text-center text-md-start py-5 container mx-auto">
        <div className="col-md-6">
          <h1 className="fw-bold display-5">
            Your AI Genie for <br /> Perfect Messages
          </h1>
          <p className="lead text-secondary mt-3">
            Generate emails, texts, LinkedIn messages, and more in seconds.
          </p>

          <div className="d-flex flex-wrap gap-2 border mt-4 p-4 rounded shadow-sm bg-white">
            {/* Topic Dropdown */}
            <select 
              className="form-select w-auto"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            >
              <option value="">Select Topic</option>
              <option value="email">Email</option>
              <option value="texting">Texting</option>
              <option value="linkedin">LinkedIn</option>
              <option value="captions">Captions</option>
            </select>

            {/* Subject Input */}
            <input
              type="text"
              className="form-control w-50"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            {/* Tone Dropdown */}
            <select 
              className="form-select w-auto"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option value="">Select Tone</option>
              <option value="formal">Formal</option>
              <option value="friendly">Friendly</option>
              <option value="funny">Funny</option>
              <option value="motivational">Motivational</option>
            </select>

            <div className="w-100 mt-3">
              {/* Flexbox to align Label and Copy Button */}
              <div className="d-flex justify-content-between align-items-center mb-2">
                <label className="fw-bold text-secondary small">AI Output:</label>
                
                {/* NEW: Copy Button (Only shows if there is output) */}
                {output && (
                    <button 
                        className={`btn btn-sm ${copied ? 'btn-success' : 'btn-outline-secondary'}`}
                        onClick={handleCopy}
                        title="Copy to clipboard"
                    >
                        {copied ? "Copied! ✅" : "Copy Text 📋"}
                    </button>
                )}
              </div>

              <textarea 
                className="form-control"
                rows="6"
                placeholder="The magic will appear here..."
                value={output}
                readOnly
                style={{ backgroundColor: "#f8f9fa", resize: "none" }}
              ></textarea>
            </div>

            {/* Button */}
            <button 
              className="btn btn-primary px-4 fw-semibold w-100 mt-3"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? "Genie is Thinking..." : "Generate Message ✨"}
            </button>
          </div>
        </div>

        <div className="col-md-6 text-center mt-5 mt-md-0">
          <img src={lamp} alt="lamp" className="w-50" />
        </div>
      </div>

      {/* Features Section */}
      <div className="container my-5">
        <h2 className="text-center fw-bold mb-4">Features</h2>
        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm h-100 text-center p-4">
              <h5 className="fw-bold">Multi-Platform Messages</h5>
              <p className="text-secondary small">Email, WhatsApp, LinkedIn, Tweets...</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm h-100 text-center p-4">
              <h5 className="fw-bold">Customizable Tone</h5>
              <p className="text-secondary small">Formal, Funny, Friendly, Motivational...</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm h-100 text-center p-4">
              <h5 className="fw-bold">Save & Reuse Messages</h5>
              <p className="text-secondary small">Drafts stored for later.</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm h-100 text-center p-4">
              <h5 className="fw-bold">Instant Results</h5>
              <p className="text-secondary small">AI generates messages in seconds.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="container my-5 text-center">
        <h2 className="fw-bold mb-4">How It Works</h2>
        <div className="row justify-content-center g-4">
          <div className="col-md-4"><h5>Enter your message topic</h5></div>
          <div className="col-md-4"><h5>Choose tone & type</h5></div>
          <div className="col-md-4"><h5>Generate & copy message</h5></div>
        </div>
      </div>
    </div>
  );
}

export default Home;