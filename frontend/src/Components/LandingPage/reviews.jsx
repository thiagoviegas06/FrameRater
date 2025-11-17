import React from 'react';
import { Link } from 'react-router-dom';
import '../../Pages/landingpage.css';

const Reviews = () => {
    return ( <section className="reviews-section">
        <div className="review-card">
            <h2 className="review-title">Review 1</h2>
            <div className="movie-rating">
                <span className="stars">★★★★★</span>
                <span className="rating-number">9.0</span>
            </div>
            <p className="review-text"></p>
        </div>
        <div className="review-card">
            <h2 className="review-title">Review 2</h2>
            <div className="movie-rating">
                <span className="stars">★★★★★</span>
                <span className="rating-number">9.0</span>
            </div>
            <p className="review-text"></p>
        </div>
        <div className="review-card">
            <h2 className="review-title">Review 3</h2>
            <div className="movie-rating">
                <span className="stars">★★★★★</span>
                <span className="rating-number">9.0</span>
            </div>
            <p className="review-text"></p>
        </div>
    </section>
    );
};

export default Reviews;