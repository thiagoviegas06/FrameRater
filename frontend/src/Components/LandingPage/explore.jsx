import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import { API_BASE } from "../../api/config";
import "../../Pages/LandingPage.css";

const Explore = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Debounce typing (wait 300ms after user stops typing)
    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(() => {
        if (value.trim().length > 0) {
          fetch(`${API_BASE}/api/tmdb/search/multi?q=${encodeURIComponent(value)}`)
            .then((res) => res.json())
            .then((data) => {
              setResults(data.results || []);
            })
            .catch((err) => console.error("Search error:", err));
        } else {
          setResults([]);
        }
      }, 300)
    );
  };

  return (
    <section className="discover-section">
      <div className="container">
        <div className="discover-header fade-in-up">
          <h2 className="discover-title">
            Discover Your Next<br />
            <span className="text-red">Favorite Film</span>
          </h2>

          <p className="discover-subtitle">
            Personalized recommendations that understand your taste.<br/>
            FrameRatr makes criticism a conversation — not just a number.
          </p>

          {/* SEARCH BAR */}
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Which movies do you like?"
              className="search-input"
              value={query}
              onChange={handleSearch}
            />
          </div>

          {/* SEARCH RESULTS */}
          {results.length > 0 && (
            <div className="search-results movies-grid movies-grid--single-row fade-in-up">
              {results.slice(0, 6).map((item, index) => (
                <MovieCard
                  key={item.id}
                  title={item.title || item.name}
                  posterUrl={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : null
                  }
                  rating={Math.round((item.vote_average || 0) / 2)}
                  gradient="gradient-gray"
                  delay={index * 0.05}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Explore;