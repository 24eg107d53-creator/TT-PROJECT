import { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";
import logo from "../assets/title.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo Section */}
        <Link to="/" className="logo-section">
          <img src={logo} alt="AK Car Rental Logo" className="logo-img" />
          <span className="logo-text">AKCarRental</span>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links">
          <NavLink to="/" className="nav-item">
            Home
          </NavLink>

          <NavLink to="/cars" className="nav-item">
            Cars
          </NavLink>

          {isLoggedIn && user?.role !== "ADMIN" && (
            <NavLink to="/bookings" className="nav-item">
              My Bookings
            </NavLink>
          )}

          {user?.role === "ADMIN" && (
            <NavLink to="/admin" className="nav-item">
              Admin Panel
            </NavLink>
          )}

          {user?.role !== "ADMIN" && (
            <NavLink to="/contact" className="nav-item">
              Contact
            </NavLink>
          )}

          {!isLoggedIn ? (
            <>
              <NavLink to="/login" className="nav-item">
                Login
              </NavLink>
              <NavLink to="/register" className="nav-item">
                Register
              </NavLink>
            </>
          ) : (
            <>
              <span className="user-email">{user?.email}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>

          <NavLink to="/cars" onClick={() => setMenuOpen(false)}>
            Cars
          </NavLink>

          {isLoggedIn && user?.role !== "ADMIN" && (
            <NavLink to="/bookings" onClick={() => setMenuOpen(false)}>
              My Bookings
            </NavLink>
          )}

          {user?.role === "ADMIN" && (
            <NavLink to="/admin" onClick={() => setMenuOpen(false)}>
              Admin Panel
            </NavLink>
          )}

          {user?.role !== "ADMIN" && (
            <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </NavLink>
          )}

          {!isLoggedIn ? (
            <>
              <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </NavLink>
              <NavLink to="/register" onClick={() => setMenuOpen(false)}>
                Register
              </NavLink>
            </>
          ) : (
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}