
import React, { useState } from "react";
import FilmDetailFetcher from "../../componentsAC/MovieDetailComponents/FilmDetailFetcher";
import "./MovieCard.css";

const MovieCard = ({ title, id, rating, gradient, posterUrl, delay = 0 }) => {
    const [overlayOpen, setOverlayOpen] = useState(false);

    return (
        <>
            <div
                className="movie-card fade-in-up"
                onClick={() => setOverlayOpen(true)}
                style={{ animationDelay: `${delay}s` }}
            >
                <div className={`movie-poster ${gradient}`}>
                    {posterUrl ? (
                        <img src={posterUrl} alt={title} className="poster-img" />
                    ) : (
                        <svg className="film-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <rect x="2" y="3" width="20" height="18" rx="2" strokeWidth="2" />
                            <path d="M7 3v18M17 3v18M2 9h20M2 15h20" strokeWidth="2" />
                        </svg>
                    )}
                </div>

                <div className="movie-info">
                    <h3 className="movie-title">{title}</h3>
                    <div className="movie-rating">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className={`star ${i < rating ? "filled" : ""}`}>
                                ★
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Fetch and display the overlay */}
            <FilmDetailFetcher
                movieId={id}
                movieTitle={title}
                posterUrl={posterUrl}   // pass the poster
                rating={rating}         // pass the rating
                open={overlayOpen}
                onClose={() => setOverlayOpen(false)}
            />
        </>
    );
};

export default MovieCard;
