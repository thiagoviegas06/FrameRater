// src/Components/Search/Search.jsx (or wherever it lives)
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Search.css";
import "../Lists/Lists.css";
import { fetchPublic } from "../../api/publicClient";
import CarouselSection from "../MovieCard/CarouselSection";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(location.search);
  const urlQuery = urlParams.get("q") || "";

  const [query, setQuery] = useState(urlQuery);
  const [submittedQuery, setSubmittedQuery] = useState(urlQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runSearch = async (term) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    setLoading(true);
    setError("");
    setSubmittedQuery(trimmed);

    try {
      const data = await fetchPublic(
        `/api/tmdb/search/multi?q=${encodeURIComponent(trimmed)}`
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

  useEffect(() => {
    setQuery(urlQuery);
    if (urlQuery) {
      runSearch(urlQuery);
    } else {
      setResults([]);
      setSubmittedQuery("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlQuery]);

  // Submit handler for the Search page search bar
  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    // update the URL; effect above will call runSearch()
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
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
    <main className="movies-page-container">
      {/* Header / search bar */}
      <section className="search-header-section">
        <div className="container">
          <div className="search-results-text">
            <h2>{resultsLabel}</h2>
          </div>

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
      </section>

      {/* Only show carousels after a search */}
      {submittedQuery && (
        <>
          {/* 1. Movies results */}
          <CarouselSection
            title={`Movies matching "${submittedQuery}"`}
            gradient="gradient-red"
            items={movies}
          />

          {/* 2. TV results */}
          <CarouselSection
            title={`Shows matching "${submittedQuery}"`}
            gradient="gradient-gray"
            items={tv}
          />

          {/* 3. People results */}
          <CarouselSection
            title={`People matching "${submittedQuery}"`}
            gradient="gradient-red"
            items={people}
            isPeople={true}
          />
        </>
      )}
    </main>
  );
};

export default Search;
