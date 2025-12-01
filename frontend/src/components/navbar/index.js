import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // <--- 1. Import useLocation

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // <--- 2. Get current location

  useEffect(() => {
    // This code runs every time the URL changes (e.g. Login -> Home)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null); // Ensure user is cleared if no data found
    }
  }, [location]); // <--- 3. Add 'location' here so it re-runs on page change

  const handleLogout = () => {
    localStorage.clear();
    setUser(null); 
    navigate("/login");
  };

  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-white shadow-sm py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center" to="/">
          <img
            src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
            alt="lamp"
            width="30"
            className="me-2"
          />
          WordGenie
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            
            <li className="nav-item mx-2">
              <Link to="/" className="nav-link fw-semibold text-dark">Home</Link>
            </li>
            
            <li className="nav-item mx-2">
              <Link to="/drafts" className="nav-link fw-semibold text-dark">Drafts</Link>
            </li>

            {/* CHECK: If user exists, show Settings. If null, show Login. */}
            {user ? (
              <li className="nav-item dropdown ms-3">
                <a
                  className="nav-link dropdown-toggle fw-semibold"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Hi, {user.name || "User"} 
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button 
                      className="dropdown-item text-danger" 
                      onClick={handleLogout}
                    >
                      Logout <i className="bi bi-box-arrow-right ms-1"></i>
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item ms-3">
                <Link to="/login">
                  <button className="btn btn-primary rounded-pill px-4 fw-semibold">
                    Login
                  </button>
                </Link>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;