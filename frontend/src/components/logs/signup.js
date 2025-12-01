import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
      // 1. Signup Request
      // 👇 UPDATED: Uses your .env variable
      const signupRes = await fetch(`${process.env.REACT_APP_Backend_API}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const signupData = await signupRes.json();
      if (!signupRes.ok) throw new Error(signupData.message);

      // 2. Auto-Login Request
      // 👇 UPDATED: Uses your .env variable
      const loginRes = await fetch(`${process.env.REACT_APP_Backend_API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginRes.json();
      if (!loginRes.ok) {
        alert("Account created! Please log in.");
        navigate("/login");
        return;
      }

      localStorage.clear();
      localStorage.setItem("token", loginData.token);
      localStorage.setItem("user", JSON.stringify(loginData.user));

      alert("Account created & Logged in!");
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
            <h1 className="fw-bold">Join Us Today!</h1>
            <p className="small">Create your account and start your journey.</p>
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
            <Link to="/login" className="text-decoration-none fw-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;