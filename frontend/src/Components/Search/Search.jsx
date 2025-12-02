import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import YourLists from "../Dashboard/YourLists";
import SearchListView from "./SearchListView";
import MovieCard from "../MovieCard/MovieCard"; // import your MovieCard
import "./Search.css";
import { fetchPublic } from "../../api/publicClient";

const IMG_BASE = "https://image.tmdb.org/t/p/w300";

const Search = () => {
    const location = useLocation();
    const urlQuery = new URLSearchParams(location.search).get("q") || "";

    const [viewMode, setViewMode] = useState("card");
    const [query, setQuery] = useState("");
    const [submittedQuery, setSubmittedQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const runSearch = async (value) => {
        setLoading(true);
        setError("");

        try {
            const data = await fetchPublic(
                `/api/tmdb/search/multi?q=${encodeURIComponent(value)}`
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
        if (urlQuery.trim().length === 0) return;

        setQuery(urlQuery);
        setSubmittedQuery(urlQuery);
        runSearch(urlQuery);
    }, [urlQuery]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        window.history.pushState({}, "", `/search?q=${encodeURIComponent(query)}`);
        runSearch(query);
        setSubmittedQuery(query);
    };

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
                    <h2>{resultsLabel}</h2>
                    <form className="search-bar-wrapper" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="What will you discover?"
                            className="search-input"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button type="submit" style={{ all: "unset", cursor: "pointer" }}>
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

                    {loading && <p style={{ color: "white", marginTop: "0.5rem" }}>Searching...</p>}
                    {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}
                </div>
            </div>

            <SearchSection title="Movies" items={movies} viewMode={viewMode} setViewMode={setViewMode} isPeople={false} />
            <SearchSection title="TV" items={tv} viewMode={viewMode} setViewMode={setViewMode} isPeople={false} />
            <SearchSection title="People" items={people} viewMode={viewMode} setViewMode={setViewMode} isPeople />
            <SearchSection title="Lists" items={[]} viewMode={viewMode} setViewMode={setViewMode} lists />
        </div>
    );
};

// Search section component
function SearchSection({ title, items, viewMode, setViewMode, isPeople = false, lists = false }) {
    return (
        <div className="search-section">
            <div className="container">
                <div className="search-section-header">
                    <h3 className="section-heading">{title}</h3>
                    <div className="view-toggle">
                        <button className={`view-toggle-btn ${viewMode === "card" ? "active" : ""}`} onClick={() => setViewMode("card")} aria-label="Grid view">
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4 4h7v7H4V4zm0 9h7v7H4v-7zm9-9h7v7h-7V4zm0 9h7v7h-7v-7z" />
                            </svg>
                        </button>
                        <button className={`view-toggle-btn ${viewMode === "list" ? "active" : ""}`} onClick={() => setViewMode("list")} aria-label="List view">
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {lists ? (
                    <YourLists />
                ) : viewMode === "card" ? (
                    <SearchCardsGrid items={items} isPeople={isPeople} />
                ) : (
                    <SearchListView results={items} isPeople={isPeople} />
                )}

                <button className="see-more-btn">see more</button>
            </div>
        </div>
    );
}

// Render cards using your MovieCard component
function SearchCardsGrid({ items, isPeople = false }) {
    if (!items || items.length === 0) {
        return <p style={{ color: "#a1a1aa", fontSize: "0.9rem" }}>No results in this category yet.</p>;
    }

    return (
        <div className="movies-grid">
            {items.map((item, index) => {
                const title = item.title || item.name;
                const imgPath = isPeople ? item.profile_path : item.poster_path;
                const imgUrl = imgPath ? `${IMG_BASE}${imgPath}` : null;
                const rating = Math.round(item.vote_average / 2); // convert 10-scale to 5 stars
                const gradient = imgUrl ? "" : "gradient-gray";

                return (
                    <MovieCard
                        key={item.id || `${title}-${index}`}
                        title={title}
                        id={item.id}
                        rating={rating}
                        gradient={gradient}
                        posterUrl={imgUrl}
                        delay={index * 0.05}
                    />
                );
            })}
        </div>
    );
}

export default Search;
