// src/Components/Trending/TrendingMovies.jsx
import React, { useEffect, useState } from "react";
import { API_BASE } from "../../api/config";
import MovieCard from "../MovieCard/MovieCard";

const VISIBLE_COUNT = 6;

console.log(API_BASE)

const TrendingNow = () => {
  const [movies, setMovies] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE}/api/tmdb/trending/movies`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
        setStartIndex(0);
      })
      .catch((err) => console.error("Error fetching trending:", err));
  }, []);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - VISIBLE_COUNT, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + VISIBLE_COUNT, Math.max(0, movies.length - VISIBLE_COUNT))
    );
  };

  const visibleMovies = movies.slice(startIndex, startIndex + VISIBLE_COUNT);

  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + VISIBLE_COUNT < movies.length;

  return (
    <section className="movies-section">
      <div className="movies-header fade-in-up">
        <h2 className="section-title">Trending Now</h2>
        <button className="view-all-link">View All →</button>
      </div>

      <div className="movies-carousel">
        <button
          className="carousel-btn carousel-btn-prev"
          onClick={handlePrev}
          disabled={!canGoPrev}
        >
          ‹
        </button>

        <div className="movies-grid movies-grid--single-row">
          {visibleMovies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              posterUrl={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : null
              }
              rating={Math.round(movie.vote_average / 2)}
              gradient="gradient-red"
              delay={index * 0.05}
              onClick={() => console.log("Clicked:", movie.title)}
            />
          ))}
        </div>

        <button
          className="carousel-btn carousel-btn-next"
          onClick={handleNext}
          disabled={!canGoNext}
        >
          ›
        </button>
      </div>
    </section>
  );
};

export default TrendingNow;