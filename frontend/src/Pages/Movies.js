import React, { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard/MovieCard";
import { tmdb_client } from "../api/tmdb";
import "../Pages/LandingPage.css"; // adjust path

const VISIBLE_COUNT = 6;

const categories = [
    { key: "trending", title: "Trending", fetcher: tmdb_client.get_trending_movies },
    { key: "popular", title: "Popular", fetcher: tmdb_client.get_popular_movies },
    { key: "topRated", title: "Top Rated", fetcher: tmdb_client.get_top_rated_movies },
    { key: "upcoming", title: "Upcoming", fetcher: tmdb_client.get_upcoming_movies },
    { key: "nowPlaying", title: "Now Playing", fetcher: tmdb_client.get_now_playing_movies },
];

const MoviesPage = () => {
    const [moviesByCategory, setMoviesByCategory] = useState({});
    const [startIndices, setStartIndices] = useState({}); // track start index per category

    useEffect(() => {
        categories.forEach(async (cat) => {
            try {
                const results = await cat.fetcher();
                setMoviesByCategory((prev) => ({ ...prev, [cat.key]: results }));
                setStartIndices((prev) => ({ ...prev, [cat.key]: 0 }));
            } catch (err) {
                console.error(`Error fetching ${cat.title}:`, err);
            }
        });
    }, []);

    const handlePrev = (key) => {
        setStartIndices((prev) => ({
            ...prev,
            [key]: Math.max(prev[key] - VISIBLE_COUNT, 0),
        }));
    };

    const handleNext = (key) => {
        setStartIndices((prev) => {
            const total = moviesByCategory[key]?.length || 0;
            return { ...prev, [key]: Math.min(prev[key] + VISIBLE_COUNT, Math.max(0, total - VISIBLE_COUNT)) };
        });
    };

    return (
        <div className="movies-page">
            {categories.map((cat) => {
                const movies = moviesByCategory[cat.key] || [];
                const startIndex = startIndices[cat.key] || 0;
                const visibleMovies = movies.slice(startIndex, startIndex + VISIBLE_COUNT);
                const canGoPrev = startIndex > 0;
                const canGoNext = startIndex + VISIBLE_COUNT < movies.length;

                return (
                    <section key={cat.key} className="movies-section">
                        <div className="movies-header fade-in-up">
                            <h2 className="section-title">{cat.title}</h2>
                        </div>

                        <div className="movies-carousel">
                            <button
                                className="carousel-btn carousel-btn-prev"
                                onClick={() => handlePrev(cat.key)}
                                disabled={!canGoPrev}
                            >
                                ‹
                            </button>

                            <div className="movies-grid movies-grid--single-row">
                                {visibleMovies.map((movie, index) => (
                                    <MovieCard
                                        key={movie.id}
                                        id={movie.id}
                                        title={movie.title || movie.name}
                                        posterUrl={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null}
                                        rating={Math.round((movie.vote_average || 0) / 2)}
                                        gradient={index % 2 === 0 ? "gradient-red" : "gradient-gray"}
                                        delay={index * 0.05}
                                    />
                                ))}
                            </div>

                            <button
                                className="carousel-btn carousel-btn-next"
                                onClick={() => handleNext(cat.key)}
                                disabled={!canGoNext}
                            >
                                ›
                            </button>
                        </div>
                    </section>
                );
            })}
        </div>
    );
};

export default MoviesPage;
