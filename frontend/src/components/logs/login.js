import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 const handleLogin = async () => {
  setLoading(true);
  setError("");

  try {
    const res = await fetch(`${process.env.REACT_APP_Backend_API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) throw new Error(data.message);

    // Clear previous data
    localStorage.clear();

    // Save token and user info
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify({
      id: data.user.id,
      name: data.user.name,
      email: data.user.email
    }));

    alert("Login successful!");
    navigate("/");
  } catch (err) {
    setLoading(false);
    setError(err.message || "Login failed");
  }
};


  return (
    <div className="auth-container d-flex align-items-center justify-content-center vh-100 bg-gradient">
      <div className="auth-card d-flex flex-column flex-md-row shadow-lg">
        
        {/* Left Side */}
        <div className="auth-left text-white d-flex flex-column justify-content-center align-items-center p-5 rounded-start">
          <div className="text-center">
            <div className="logo-circle mb-3"></div>
            <h1 className="fw-bold">Hello, welcome!</h1>
            <p className="small">Login to continue your AI journey.</p>
            <button className="btn btn-outline-light mt-3">View more</button>
          </div>
        </div>

        {/* Right Side */}
        <div className="auth-right bg-white p-5 rounded-end">
          <h4 className="fw-bold mb-4">Login</h4>

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
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center small">
            Not a member yet?{" "}
            <a href="/signup" className="text-decoration-none fw-semibold">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
