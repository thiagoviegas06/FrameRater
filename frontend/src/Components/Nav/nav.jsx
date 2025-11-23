import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import Logo from "../Assets/FrameRatrlogo.png";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useOverlay } from "../../context/OverlayProvider";

const Nav = () => {
    const navigate = useNavigate();
    const [profileOpen, setProfileOpen] = useState(false); // menu hover
    const [authUser, setAuthUser] = useState(null);

    const { setProfileOverlayOpen } = useOverlay();

    // Watch Firebase auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthUser(user || null);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (err) {
            console.error("Error logging out:", err);
        }
    };

    return (
        <nav className="nav">
            <div className="nav-container">
                {/* LEFT: LOGO */}
                <Link to="/home">
                    <div className="nav-left">
                        <img src={Logo} className="logo-img" alt="FrameRatr logo" />
                    </div>
                </Link>

                {/* MIDDLE LINKS */}
                <div className="nav-links">
                    <Link to="/home" className="nav-link">Home</Link>
                    <Link to="/search" className="nav-link">Movies</Link>
                    <Link to="/search" className="nav-link">Shows</Link>
                    <Link to="/search" className="nav-link">Lists</Link>
                    <Link to="/reviews" className="nav-link">Reviews</Link>
                </div>

                {/* SEARCH */}
                <div className="nav-search">
                    <input
                        type="text"
                        placeholder="Discover"
                        className="nav-search-input"
                    />
                    <span className="nav-search-icon">🔍</span>
                </div>

                {/* RIGHT ICONS */}
                <div className="nav-icons">
                    {/* Settings */}
                    <Link to="/settings">
                        <svg fill="white" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
                        </svg>
                    </Link>

                    {/* Notifications */}
                    <Link to="/notifications">
                        <svg fill="white" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                        </svg>
                    </Link>

                    {/* Profile + dropdown */}
                    <div
                        className="nav-profile"
                        onMouseEnter={() => setProfileOpen(true)}
                        onMouseLeave={() => setProfileOpen(false)}
                    >
                        <svg fill="white" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>

                        <div className={`nav-profile-menu ${profileOpen ? "open" : ""}`}>
                            {/* Open overlay instead of navigating */}
                            <button
                                type="button"
                                className="nav-profile-item"
                                onClick={() => setProfileOverlayOpen(true)}
                            >
                                Profile
                            </button>

                            {/* Second item: Login OR Logout */}
                            {authUser ? (
                                <button
                                    type="button"
                                    className="nav-profile-item nav-profile-logout"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link to="/login" className="nav-profile-item">
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
