import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../../api/client";
import "../../Pages/Dashboard.css";

const YourLists = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadLists = async () => {
      try {
        // Placeholder endpoint
        const data = await fetchWithAuth("/api/lists/mine");
        // Check if an array
        setLists(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load your lists.");
      } finally {
        setLoading(false);
      }
    };

    loadLists();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <p style={{ color: "white" }}>Loading your lists...</p>
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
      {/* Your Lists Section */}
      <section className="movies-section">
        <div className="movies-header fade-in-up">
          <h2 className="section-title">Your Lists</h2>
          <a href="/your-lists" className="view-all-link">
            View All →
          </a>
        </div>

        <div className="movies-grid">
          {lists.map((list, index) => {
            // Flexible naming: supports title or name
            const title = list.title || list.name || "Untitled List";
            // support movie_count or count
            const count =
              typeof list.movie_count === "number"
                ? `${list.movie_count} films`
                : list.count || "";

            // Alternate gradients like your old temp data
            const gradient =
              index % 2 === 0 ? "gradient-red" : "gradient-gray";

            return (
              <div
                className="movie-card fade-in-up"
                key={list.id || `${title}-${index}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`movie-poster ${gradient}`}>
                  <svg
                    className="film-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="2"
                      y="3"
                      width="20"
                      height="18"
                      rx="2"
                      strokeWidth="2"
                    />
                    <path
                      d="M7 3v18M17 3v18M2 9h20M2 15h20"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                <div className="movie-info">
                  <h3 className="movie-title">{title}</h3>
                  <p className="movie-count">{count}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default YourLists;
