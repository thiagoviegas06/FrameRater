import React from "react";
import "./Footer.css";
import Logo from "../Assets/FrameRatrlogo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
                <div className="nav-left">
                    <img src={Logo} className="logo-img" alt="" />
                </div>
                <span className="logo-text">FrameRatr</span>
            </div>
            <p className="footer-tagline">
              Making criticism a conversation instead of a number.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="footer-links">
            <div className="footer-column">
              <h3 className="footer-heading">Explore</h3>
              <ul className="footer-list">
                <li><a href="/" className="footer-link">Home</a></li>
                <li><a href="/movies" className="footer-link">Movies</a></li>
                <li><a href="/lists" className="footer-link">Lists</a></li>
                <li><a href="/reviews" className="footer-link">Reviews</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Account</h3>
              <ul className="footer-list">
                <li><a href="/profile" className="footer-link">My Profile</a></li>
                <li><a href="/watchlist" className="footer-link">Watchlist</a></li>
                <li><a href="/history" className="footer-link">History</a></li>
                <li><a href="/communities" className="footer-link">Communities</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="footer-heading">Settings</h3>
              <ul className="footer-list">
                <li><a href="/profile" className="footer-link">Settings</a></li>
                <li><a href="/watchlist" className="footer-link">Preferences</a></li>
                <li><a href="/history" className="footer-link">Notifications</a></li>
                <li><a href="/communities" className="footer-link">Privacy</a></li>
              </ul>
            </div>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2025 FrameRatr. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;