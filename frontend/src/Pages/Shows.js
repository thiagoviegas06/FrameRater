import React, { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard/MovieCard"; // same card works for shows
import { tmdb_client } from "../api/tmdb";
import "../Pages/LandingPage.css"; // reuse CSS

const VISIBLE_COUNT = 6;

const categories = [
    { key: "trending", title: "Trending", fetcher: tmdb_client.get_trending_shows },
    { key: "popular", title: "Popular", fetcher: tmdb_client.get_popular_shows },
    { key: "topRated", title: "Top Rated", fetcher: tmdb_client.get_top_rated_shows },
   // { key: "airingToday", title: "Airing Today", fetcher: tmdb_client.get_airing_today_shows },
  //  { key: "onTheAir", title: "On The Air", fetcher: tmdb_client.get_on_the_air_shows },
];

const ShowsPage = () => {
    const [showsByCategory, setShowsByCategory] = useState({});
    const [startIndices, setStartIndices] = useState({});

    useEffect(() => {
        categories.forEach(async (cat) => {
            try {
                const results = await cat.fetcher();
                setShowsByCategory((prev) => ({ ...prev, [cat.key]: results }));
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
            const total = showsByCategory[key]?.length || 0;
            return { ...prev, [key]: Math.min(prev[key] + VISIBLE_COUNT, Math.max(0, total - VISIBLE_COUNT)) };
        });
    };

    return (
        <div className="movies-page">
            {categories.map((cat) => {
                const shows = showsByCategory[cat.key] || [];
                const startIndex = startIndices[cat.key] || 0;
                const visibleShows = shows.slice(startIndex, startIndex + VISIBLE_COUNT);
                const canGoPrev = startIndex > 0;
                const canGoNext = startIndex + VISIBLE_COUNT < shows.length;

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
                                {visibleShows.map((show, index) => (
                                    <MovieCard
                                        key={show.id}
                                        id={show.id}
                                        title={show.name || show.original_name}
                                        posterUrl={show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : null}
                                        rating={Math.round((show.vote_average || 0) / 2)}
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

export default ShowsPage;
