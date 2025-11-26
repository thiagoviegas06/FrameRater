import React, { useEffect, useState } from "react";
import { fetchPublic } from "../../api/publicClient";
import "../../Pages/Dashboard.css";

const TrendingNow = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const data = await fetchPublic("/api/tmdb/trending/movies");
        setMovies(data.results || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load trending movies.");
      } finally {
        setLoading(false);
      }
    };

    loadTrending();
  }, []);

  if (loading) {
    return <div className="container"><p style={{ color: "white" }}>Loading trending movies...</p></div>;
  }

  if (error) {
    return <div className="container"><p style={{ color: "red" }}>{error}</p></div>;
  }

  return (
    <div className="container">
      <section className="movies-section">
        <div className="movies-header fade-in-up">
          <h2 className="section-title">Trending Now</h2>
          <a href="/trending" className="view-all-link">View All →</a>
        </div>

        <div className="movies-grid">
          {movies.map((movie, index) => {
            const poster = movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : null;

            return (
              <div
                className="movie-card fade-in-up"
                key={movie.id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={poster ? "movie-poster" : "movie-poster gradient-gray"}>
                  {poster ? (
                    <img src={poster} alt={movie.title} className="poster-img" />
                  ) : (
                    <svg className="film-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="2" y="3" width="20" height="18" rx="2" strokeWidth="2"/>
                      <path d="M7 3v18M17 3v18M2 9h20M2 15h20" strokeWidth="2"/>
                    </svg>
                  )}
                </div>

                <div className="movie-info">
                  <h3 className="movie-title">{movie.title}</h3>
                  <div className="movie-rating">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`star ${i < Math.round(movie.vote_average / 2) ? "filled" : ""}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default TrendingNow;
