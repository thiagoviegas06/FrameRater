import React from 'react';
import '../../Pages/landingpage.css';

const Explore = () => {
    return (
        <section className="discover-section">
            <div className="container">
                <div className="discover-header fade-in-up">
                    <h2 className="discover-title">
                        Discover Your Next<br/>
                        <span className="text-red">Favorite Film</span>
                    </h2>
                    <p className="discover-subtitle">
                        Personalized recommendations that understand your taste. FrameRatr makes criticism a conversation instead of a number.
                    </p>
                    <div className="search-wrapper">
                        <input
                            type="text"
                            placeholder="Which movies do you like?"
                            className="search-input"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Explore;