import React from "react";
import "../../Pages/Dashboard.css";

const communityListsData = [
  { id: 1, title: "Best of 2024", count: "by cinephile_23", gradient: "gradient-red", isPlaylist: true },
  { id: 2, title: "Hidden Gems", count: "by filmfinder", gradient: "gradient-gray", isPlaylist: true },
  { id: 3, title: "Criterion Must-Watch", count: "by classicfan", gradient: "gradient-red", isPlaylist: true },
  { id: 4, title: "Sci-Fi Essentials", count: "by spacelover", gradient: "gradient-gray", isPlaylist: true },
  { id: 5, title: "Horror Masterclass", count: "by scarelord", gradient: "gradient-red", isPlaylist: true },
  { id: 6, title: "International Cinema", count: "by worldfilms", gradient: "gradient-gray", isPlaylist: true }
];

const CommunityLists = () => {
  return (
    <div className="container">
      {/* Community Lists Section */}
      <section className="movies-section">
        <div className="movies-header fade-in-up">
          <h2 className="section-title">Community Lists</h2>
          <a href="/community-lists" className="view-all-link">View All →</a>
        </div>
        <div className="movies-grid">
          {communityListsData.map((movie, index) => (
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
                <p className="movie-count">{movie.count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CommunityLists;