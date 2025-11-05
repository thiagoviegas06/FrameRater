import React from 'react';
import { Link } from 'react-router-dom';
import '../../Pages/landingpage.css';

const CTA = () => {
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
                        <Link to="./" className="cta-btn-secondary">
                            Create Your Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CTA;