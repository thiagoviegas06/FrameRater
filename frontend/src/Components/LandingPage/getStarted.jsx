import React from 'react';
import '../../Pages/LandingPage.css';
import { useOverlay } from '../../context/OverlayProvider';

const GetStarted = () => {
    const { setCreateAccountOverlayOpen } = useOverlay();

    return (
        <div className='wrapper gs-wrapper'>
            <div className="gs-container">
                <div className="gs-content">
                    <h2 className="gs-title">
                        Watch More. Rate More. <br />Discover More.
                    </h2>
                    <p className="gs-description">
                        FrameRatr’s adaptive engine learns your taste, one movie at a time.
                    </p>
                    <div className="gs-actions">
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
        </div>
    );
};

export default GetStarted;
