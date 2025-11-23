import React from 'react';
import '../../Pages/LandingPage.css';
const Community = () => {
    return (
        // Community
        <section className="trending-section">
            <div className="container">
                <div className="trending-header fade-in-up">
                    <h2 className="section-title">Community Spotlight</h2>
                    <a href="#" className="view-all-link">View All →</a>
                </div>

                <div className="movies-grid">
                    {/* Movie card */}
                    <div className="movie-card fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <div className="movie-poster gradient-dark">
                            <svg className="movie-icon icon-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <rect x="2" y="3" width="20" height="18" rx="2" strokeWidth="2"/>
                                <path d="M7 3v18M17 3v18M2 9h20M2 15h20" strokeWidth="2"/>
                            </svg>
                        </div>
                        <div className="movie-info">
                            <h3 className="movie-title">The Dark Knight</h3>
                            <div className="movie-rating">
                                <span className="stars">★★★★★</span>
                                <span className="rating-number">9.0</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="movie-card fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="movie-poster gradient-dark">
                            <svg className="movie-icon icon-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <rect x="2" y="3" width="20" height="18" rx="2" strokeWidth="2"/>
                                <path d="M7 3v18M17 3v18M2 9h20M2 15h20" strokeWidth="2"/>
                            </svg>
                        </div>
                        <div className="movie-info">
                            <h3 className="movie-title">Inception</h3>
                            <div className="movie-rating">
                                <span className="stars">★★★★★</span>
                                <span className="rating-number">8.8</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="movie-card fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="movie-poster gradient-dark">
                            <svg className="movie-icon icon-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <rect x="2" y="3" width="20" height="18" rx="2" strokeWidth="2"/>
                                <path d="M7 3v18M17 3v18M2 9h20M2 15h20" strokeWidth="2"/>
                            </svg>
                        </div>
                        <div className="movie-info">
                            <h3 className="movie-title">Pulp Fiction</h3>
                            <div className="movie-rating">
                                <span className="stars">★★★★★</span>
                                <span className="rating-number">8.9</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Community;