import React from 'react';
import '../../Pages/LandingPage.css';
import { useOverlay } from '../../context/OverlayProvider';

const CTA = () => {
    const { setCreateAccountOverlayOpen } = useOverlay();

    return (
        <div className='wrapper cta-wrapper'>
            <div className="cta-container">
                <div className="cta-content">
                    <h2 className="cta-title">
                        Join the Conversation
                    </h2>
                    <p className="cta-description">
                        No fees or obligations
                    </p>
                    <div className="cta-actions">
                        <button
                            type="button"
                            className="cta-btn-secondary"
                            onClick={() => setCreateAccountOverlayOpen(true)}
                        >
                            Create Your Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CTA;
