import React from "react";
import "../../Pages/Dashboard.css";

const newReleasesData = [
  { id: 1, title: "Dune: Part Two", rating: 5, gradient: "gradient-red" },
  { id: 2, title: "Poor Things", rating: 4, gradient: "gradient-gray" },
  { id: 3, title: "The Zone of Interest", rating: 5, gradient: "gradient-red" },
  { id: 4, title: "Killers of the Flower Moon", rating: 5, gradient: "gradient-red" },
  { id: 5, title: "Oppenheimer", rating: 5, gradient: "gradient-red" },
  { id: 6, title: "The Holdovers", rating: 4, gradient: "gradient-gray" }
];

const NewReleases = () => {
  return (
    <div className="container">
      {/* New Releases Section */}
      <section className="movies-section">
        <div className="movies-header fade-in-up">
          <h2 className="section-title">New Releases</h2>
          <a href="/new-releases" className="view-all-link">View All →</a>
        </div>
        <div className="movies-grid">
          {newReleasesData.map((movie, index) => (
            <div
              className="movie-card fade-in-up"
              key={movie.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`movie-poster ${movie.gradient}`}>
                <svg className="film-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="3" width="20" height="18" rx="2" strokeWidth="2"/>
                  <path d="M7 3v18M17 3v18M2 9h20M2 15h20" strokeWidth="2"/>
                </svg>
              </div>

              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <div className="movie-rating">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`star ${i < movie.rating ? 'filled' : ''}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NewReleases;