import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import Logo from "../Assets/FrameRatrlogo.png";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useOverlay } from "../../context/OverlayProvider";

const Nav = () => {
    const [authUser, setAuthUser] = useState(null);
    const [profileOpen, setProfileOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();
    const { setLoginOverlayOpen, setCreateAccountOverlayOpen } = useOverlay();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) =>
            setAuthUser(user || null)
        );
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            window.location.href = "/";
        } catch (err) {
            console.error("Error logging out:", err);
        }
    };

    const handleNavSearch = (e) => {
        e.preventDefault();
        if (!searchInput.trim()) return;
        navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    };

    const PersonDropdown = ({
                                authUser,
                                profileOpen,
                                setProfileOpen,
                                handleLogout,
                                setLoginOverlayOpen,
                                setCreateAccountOverlayOpen,
                            }) => (
        <div
            className="nav-profile"
            onMouseEnter={() => setProfileOpen(true)}
            onMouseLeave={() => setProfileOpen(false)}
        >
            <svg fill="white" viewBox="0 0 24 24" width="24" height="24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>

            <div className={`nav-profile-menu ${profileOpen ? "open" : ""}`}>
                {authUser ? (
                    <button
                        type="button"
                        className="nav-profile-item nav-profile-logout"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <button
                            type="button"
                            className="nav-profile-item"
                            onClick={() => setLoginOverlayOpen(true)}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            className="nav-profile-item"
                            onClick={() => setCreateAccountOverlayOpen(true)}
                        >
                            Sign Up
                        </button>
                    </>
                )}
            </div>
        </div>
    );

    return (
        <nav className="nav">
            <div className="nav-container">
                {/* LEFT: LOGO */}
                <Link to="/home" className="nav-left">
                    <img src={Logo} className="logo-img" alt="FrameRatr logo" />
                </Link>

                {/* MIDDLE LINKS */}
                {authUser && (
                    <div className="nav-links">
                        <Link to="/home" className="nav-link">
                            Home
                        </Link>
                        <Link to="/movies" className="nav-link">
                            Movies
                        </Link>
                        <Link to="/shows" className="nav-link">
                            Shows
                        </Link>
                    </div>
                )}

                {/* RIGHT SIDE */}
                <div style={{ display: "flex", alignItems: "center", marginLeft: "auto", gap: "12px" }}>
                    {/* SEARCH BAR */}
                    <form className="nav-search" onSubmit={handleNavSearch}>
                        <div className="nav-search-wrapper">
                            <input
                                type="text"
                                placeholder="Discover"
                                className="nav-search-input"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <button type="submit" className="nav-search-icon-btn">
                                🔍
                            </button>
                        </div>
                    </form>

                    {/* PROFILE ONLY */}
                    <PersonDropdown
                        authUser={authUser}
                        profileOpen={profileOpen}
                        setProfileOpen={setProfileOpen}
                        handleLogout={handleLogout}
                        setLoginOverlayOpen={setLoginOverlayOpen}
                        setCreateAccountOverlayOpen={setCreateAccountOverlayOpen}
                    />
                </div>
            </div>
        </nav>
    );
};

export default Nav;
