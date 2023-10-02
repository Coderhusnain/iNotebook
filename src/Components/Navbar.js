import { React, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {}, [location]);
  function handleLogout() {
    localStorage.removeItem('token');
    console.log(localStorage.getItem('token'))
    navigate('/about');
  }

  return (
    <div>
      <nav className="navbar   navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li
                className={`nav-item ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link className="nav-link " aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/about" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <>
                <Link
                  className="btn btn-success mx-1"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-1"
                  to="/signup"
                  role="button"
                >
                  Signup
                </Link>
              </>
            ) : (
              <Link className="btn btn-primary mx-1" onClick={handleLogout} role="button">
                Logout
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
