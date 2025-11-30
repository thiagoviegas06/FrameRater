import React, { useState } from "react";
import YourLists from "../Dashboard/YourLists";
import SearchListView from "./SearchListView";
import "./Search.css";
import { fetchPublic } from "../../api/publicClient";

const Search = () => {
    const [viewMode, setViewMode] = useState("card"); // 'card' or 'list'
    const [query, setQuery] = useState("");
    const [submittedQuery, setSubmittedQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setSubmittedQuery(query);

    try {
      const data = await fetchPublic(
        `/api/tmdb/search/multi?q=query${encodeURIComponent(query.trim())}`
      );
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load search results.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Split results by type
  const movies = results.filter(
    (r) => r.media_type === "movie" || (!r.media_type && r.title)
  );
  const tv = results.filter((r) => r.media_type === "tv");
  const people = results.filter((r) => r.media_type === "person");

  const resultsLabel =
    submittedQuery && results.length
      ? `Results for "${submittedQuery}" (${results.length} found)`
      : submittedQuery && !results.length
      ? `No results for "${submittedQuery}"`
      : `Search across movies, TV, and people`;

  return (
    <div className="search-page">
      <div className="search-header-section">
        <div className="container">
          {/* Search output */}
          <div className="search-results-text">
            <h2>{resultsLabel}</h2>
          </div>

          {/* Search Bar */}
          <form className="search-bar-wrapper" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="What will you discover?"
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              style={{ all: "unset", cursor: "pointer" }}
              aria-label="Search"
            >
              <svg
                className="search-icon"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>

          {loading && (
            <p style={{ color: "white", marginTop: "0.5rem" }}>Searching...</p>
          )}
          {error && (
            <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>
          )}
        </div>
      </div>

      {/* Movies Section */}
      <div className="search-section">
        <div className="container">
          <div className="search-section-header">
            <h3 className="section-heading">Movies</h3>

            {/* View Toggle Buttons */}
            <div className="view-toggle">
              <button
                className={`view-toggle-btn ${
                  viewMode === "card" ? "active" : ""
                }`}
                onClick={() => setViewMode("card")}
                aria-label="Grid view"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 4h7v7H4V4zm0 9h7v7H4v-7zm9-9h7v7h-7V4zm0 9h7v7h-7v-7z" />
                </svg>
              </button>
              <button
                className={`view-toggle-btn ${
                  viewMode === "list" ? "active" : ""
                }`}
                onClick={() => setViewMode("list")}
                aria-label="List view"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                </svg>
              </button>
            </div>
          </div>

          {viewMode === "card" ? (
            <SearchCardsGrid items={movies} />
          ) : (
            <SearchListView results={movies} />
          )}

          {/* Optional: "see more" could do pagination later */}
          <button className="see-more-btn">see more</button>
        </div>
      </div>

      {/* TV Section */}
      <div className="search-section">
        <div className="container">
          <div className="search-section-header">
            <h3 className="section-heading">TV</h3>
            <div className="view-toggle">
              <button
                className={`view-toggle-btn ${
                  viewMode === "card" ? "active" : ""
                }`}
                onClick={() => setViewMode("card")}
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 4h7v7H4V4zm0 9h7v7H4v-7zm9-9h7v7h-7V4zm0 9h7v7h-7v-7z" />
                </svg>
              </button>
              <button
                className={`view-toggle-btn ${
                  viewMode === "list" ? "active" : ""
                }`}
                onClick={() => setViewMode("list")}
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                </svg>
              </button>
            </div>
          </div>

          {viewMode === "card" ? (
            <SearchCardsGrid items={tv} />
          ) : (
            <SearchListView results={tv} />
          )}

          <button className="see-more-btn">see more</button>
        </div>
      </div>

      {/* People Section */}
      <div className="search-section">
        <div className="container">
          <div className="search-section-header">
            <h3 className="section-heading">People</h3>
            <div className="view-toggle">
              <button
                className={`view-toggle-btn ${
                  viewMode === "card" ? "active" : ""
                }`}
                onClick={() => setViewMode("card")}
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 4h7v7H4V4zm0 9h7v7H4v-7zm9-9h7v7h-7V4zm0 9h7v7h-7v-7z" />
                </svg>
              </button>
              <button
                className={`view-toggle-btn ${
                  viewMode === "list" ? "active" : ""
                }`}
                onClick={() => setViewMode("list")}
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                </svg>
              </button>
            </div>
          </div>

          {viewMode === "card" ? (
            <SearchCardsGrid items={people} isPeople />
          ) : (
            <SearchListView results={people} isPeople />
          )}

          <button className="see-more-btn">see more</button>
        </div>
      </div>

      {/* Lists Section (still placeholder / future feature) */}
      <div className="search-section">
        <div className="container">
          <div className="search-section-header">
            <h3 className="section-heading">Lists</h3>
            <div className="view-toggle">
              <button
                className={`view-toggle-btn ${
                  viewMode === "card" ? "active" : ""
                }`}
                onClick={() => setViewMode("card")}
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 4h7v7H4V4zm0 9h7v7H4v-7zm9-9h7v7h-7V4zm0 9h7v7h-7v-7z" />
                </svg>
              </button>
              <button
                className={`view-toggle-btn ${
                  viewMode === "list" ? "active" : ""
                }`}
                onClick={() => setViewMode("list")}
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* For now still using YourLists until there’s a lists API */}
          {viewMode === "card" ? (
            <YourLists />
          ) : (
            <SearchListView results={[]} />
          )}

          <button className="see-more-btn">see more</button>
        </div>
      </div>
    </div>
  );
};

// Small helper to render cards using your existing CSS
const IMG_BASE = "https://image.tmdb.org/t/p/w300";

function SearchCardsGrid({ items, isPeople = false }) {
  if (!items || items.length === 0) {
    return (
      <p style={{ color: "#a1a1aa", fontSize: "0.9rem" }}>
        No results in this category yet.
      </p>
    );
  }

  return (
    <div className="movies-grid">
      {items.map((item, index) => {
        const title = item.title || item.name;
        const imgPath = isPeople ? item.profile_path : item.poster_path;
        const imgUrl = imgPath ? `${IMG_BASE}${imgPath}` : null;

        return (
          <div
            className="movie-card fade-in-up"
            key={item.id || `${title}-${index}`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div
              className={imgUrl ? "movie-poster" : "movie-poster gradient-gray"}
            >
              {imgUrl ? (
                <img src={imgUrl} alt={title} className="poster-img" />
              ) : (
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
                  <path d="M7 3v18M17 3v18M2 9h20M2 15h20" strokeWidth="2" />
                </svg>
              )}
            </div>

            <div className="movie-info">
              <h3 className="movie-title">{title}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Search;