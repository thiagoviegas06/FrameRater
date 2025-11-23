import React from 'react';
import { Link } from 'react-router-dom';
import '../../Pages/LandingPage.css';

const getStarted = () => {
    return (
        <div className='wrapper gs-wrapper'>
            <div className="gs-container">
                <div className="gs-content">
                    <h2 className="gs-title">
                        Watch More. Rate More. <br></br>Discover More.
                    </h2>
                    <p className="gs-description">
                        FrameRatr’s adaptive engine learns your taste, one movie at a time.
                    </p>
                    <div className="gs-actions">
                        <Link to="./login" className="gs-btn-secondary">
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default getStarted;