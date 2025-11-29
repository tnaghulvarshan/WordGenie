import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.REACT_APP_Backend_API}/auth/signup`, {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) throw new Error(data.message);

      alert("Signup successful! Please login.");
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container d-flex align-items-center justify-content-center vh-100 bg-gradient">
      <div className="auth-card d-flex flex-column flex-md-row shadow-lg">
        
        {/* Left Side */}
        <div className="auth-left text-white d-flex flex-column justify-content-center align-items-center p-5 rounded-start">
          <div className="text-center">
            <div className="logo-circle mb-3"></div>
            <h1 className="fw-bold">Join Us Today!</h1>
            <p className="small">Create your account and start your journey.</p>
            <button className="btn btn-outline-light mt-3">Learn More</button>
          </div>
        </div>

        {/* Right Side */}
        <div className="auth-right bg-white p-5 rounded-end">
          <h4 className="fw-bold mb-4">Sign Up</h4>

          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="name@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-danger small mb-2">{error}</p>}

          <button
            className="btn btn-primary w-100 mb-3"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          <p className="text-center small">
            Already have an account?{" "}
            <a href="/login" className="text-decoration-none fw-semibold">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
