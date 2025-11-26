import React from "react";
import "./Search.css";

const SearchListView = ({ results = [], isPeople = false }) => {
  if (!results.length) {
    return (
      <div className="search-list-view">
        <p style={{ color: "#a1a1aa", fontSize: "0.9rem" }}>
          No results to display.
        </p>
      </div>
    );
  }

  return (
    <div className="search-list-view">
      {results.map((item) => {
        const title = item.title || item.name;
        const year =
          item.release_date?.slice(0, 4) ||
          item.first_air_date?.slice(0, 4) ||
          "";
        const vote = item.vote_average ? item.vote_average.toFixed(1) : null;
        const match = item.vote_average
          ? `${Math.round(item.vote_average * 10)}% Match`
          : null;

        return (
          <div key={item.id} className="search-list-item">
            <div className="list-item-header">
              <h4 className="list-item-title">{title}</h4>
              {match && <span className="list-item-match">{match}</span>}
            </div>

            {!isPeople && item.overview && (
              <p className="list-item-summary">
                {item.overview.length > 220
                  ? item.overview.slice(0, 217) + "..."
                  : item.overview}
              </p>
            )}

            <div className="list-item-meta">
              {year && <span className="meta-tag">{year}</span>}
              {!isPeople && <span className="meta-tag">TMDB</span>}
              {vote && <span className="meta-tag">Rating {vote}</span>}

              {/* Placeholder actions */}
              <button className="meta-btn">
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
                0
              </button>
              <button className="meta-btn">
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                0
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchListView;
