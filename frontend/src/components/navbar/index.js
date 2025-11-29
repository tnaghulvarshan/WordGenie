import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const handleLogout = () => {
  // Clear all localStorage data
  localStorage.clear();

  // Optionally redirect to login page
  window.location.href = "/login";
};
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
      <div className="container">
        <a className="navbar-brand fw-bold fs-4 d-flex align-items-center" href="#">
          <img
            src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
            alt="lamp"
            width="30"
            className="me-2"
          />
          WordGenie
        </a>
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
            <Link to="/" className="nav-item mx-2">
              <a className="nav-link fw-semibold text-dark" href="#">Home</a>
            </Link>
            <Link to="/drafts" className="nav-item mx-2">
              <a className="nav-link fw-semibold text-dark" href="#">Drafts</a>
            </Link>
             <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Settings
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item"    onClick={handleLogout} href="#">Logout <i className="bi bi-box-arrow-righ text-black"></i> </a></li>
             
          </ul>
        </li>
            <Link to="/login" className="nav-item ms-3">
              <button className="btn btn-primary rounded-pill px-4 fw-semibold">Login </button>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
