import React from 'react';
import { Link } from 'react-router-dom';
import '../../Pages/LandingPage.css';

const Hero = () => {
    return ( <div className="hero-section">
        <div className="hero-text">
            <h1 className='title'>FRAMRATR</h1>
            <p>Enjoy the Show</p>
            <div className="get-started">
                <Link to="/register" className="gs-btn-secondary">
                    Get Started
                </Link>
            </div>
        </div>
    </div>
    );
};

export default Hero;