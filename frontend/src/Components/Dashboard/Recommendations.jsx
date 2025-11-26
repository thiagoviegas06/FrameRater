import React, { useEffect, useState } from "react";
import { fetchPublic } from "../../api/publicClient";
import "../../Pages/Dashboard.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const Recommendations = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        // Temporary: using trending as the source until recs endpoint is ready
        const data = await fetchPublic("/api/tmdb/trending/movies");
        setMovies(data.results || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load recommendations.");
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <p style={{ color: "white" }}>Loading recommendations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Recommendations Section */}
      <section className="movies-section">
        <div className="movies-header fade-in-up">
          <h2 className="section-title">Recommendations</h2>
          <a href="/recommendations" className="view-all-link">
            View All →
          </a>
        </div>

        <div className="movies-grid">
          {movies.map((movie, index) => {
            const poster = movie.poster_path
              ? `${IMAGE_BASE}${movie.poster_path}`
              : null;

            return (
              <div
                className="movie-card fade-in-up"
                key={movie.id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={poster ? "movie-poster" : "movie-poster gradient-gray"}>
                  {poster ? (
                    <img
                      src={poster}
                      alt={movie.title}
                      className="poster-img"
                    />
                  ) : (
                    <svg
                      className="film-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <rect x="2" y="3" width="20" height="18" rx="2" strokeWidth="2" />
                      <path d="M7 3v18M17 3v18M2 9h20M2 15h20" strokeWidth="2" />
                    </svg>
                  )}
                </div>

                <div className="movie-info">
                  <h3 className="movie-title">{movie.title}</h3>

                  <div className="movie-rating">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`star ${
                          i < Math.round((movie.vote_average || 0) / 2)
                            ? "filled"
                            : ""
                        }`}
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

export default Recommendations;
