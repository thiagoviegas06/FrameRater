import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import { useNavigate } from "react-router-dom";


// Nav logic
const Nav = () => {

    const navigate = useNavigate();

    // const handleLogout = () => {
    //     setIsLoggedIn(false);
    //     navigate("/landingpage")
    // };

    return (
        <nav className="nav">
            <div className="nav-container">
                {/* Logo */}
                {/* <Link to="/landingpage">
                    <img src={logo} alt="Frameratr logo" className='logo-img'/>
                </Link> */}
                {/* Navigation Links */}
                <div className="nav-links">
                    {/* Home */}
                    <Link to="/home" className="nav-link">
                        Home
                    </Link>

                    {/* Movies */}
                    <Link to="/movies" className="nav-link">
                        Movies
                    </Link>

                    {/* Lists */}
                    <Link to="/lists" className="nav-link">
                        Lists
                    </Link>
                    {/* Reviews */}
                    <Link to="/reviews" className="nav-link">
                        Reviews
                    </Link>
                    {/* History */}
                    <Link to="/history" className="nav-link">
                        History
                    </Link>
                    {/* Search */}

                    {/* Settings */}
                    <Link to="/settings" className="nav-link">
                        icon
                    </Link>
                    {/* Notifications */}
                    <Link to="/notifications" className="nav-link">
                        icon
                    </Link>
                    {/* Profile */}
                    <Link to="/profile" className="nav-link">
                        icon
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Nav;