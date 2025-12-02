import React, { useEffect, useState } from "react";
import { API_BASE } from "../../api/config";
import MovieCard from "../MovieCard/MovieCard";
import "../../Pages/Dashboard.css";

const VISIBLE_COUNT = 6;

const NewReleases = () => {
  const [movies, setMovies] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {

    fetch(`${API_BASE}/api/tmdb/now-playing/movies`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
        setStartIndex(0);
      })
      .catch((err) => console.error("Error fetching new releases:", err));
  }, []);

  const total = movies.length;
  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + VISIBLE_COUNT < total;

  const handlePrev = () => {
    if (!canGoPrev) return;
    setStartIndex((prev) => Math.max(prev - VISIBLE_COUNT, 0));
  };

  const handleNext = () => {
    if (!canGoNext) return;
    setStartIndex((prev) =>
      Math.min(prev + VISIBLE_COUNT, Math.max(0, total - VISIBLE_COUNT))
    );
  };

  const visibleMovies = movies.slice(startIndex, startIndex + VISIBLE_COUNT);

  return (
    <section className="movies-section">
      <div className="movies-header fade-in-up">
        <h2 className="section-title">New Releases</h2>
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
              title={movie.title || movie.name}
              posterUrl={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : null
              }
              rating={Math.round((movie.vote_average || 0) / 2)} // 0–10 → 0–5 stars
              gradient="gradient-red"
              delay={index * 0.05}
              onClick={() => console.log("Clicked New Release:", movie.title)}
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

export default NewReleases;