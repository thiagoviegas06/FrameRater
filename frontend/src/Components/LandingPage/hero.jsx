import React from 'react';
import { useOverlay } from "../../context/OverlayProvider";
import '../../Pages/LandingPage.css';

const Hero = () => {
    const { setCreateAccountOverlayOpen } = useOverlay();

    return (
        <div className="hero-section">
            <div className="hero-text">
                <h1 className='title'>FRAMRATR</h1>
                <p>Enjoy the Show</p>
                <div className="get-started">
                    <button
                        type="button"
                        className="gs-btn-secondary"
                        onClick={() => setCreateAccountOverlayOpen(true)}
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
