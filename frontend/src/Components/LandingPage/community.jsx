import React, { useEffect, useState } from "react";
import { API_BASE } from "../../api/config";
import MovieCard from "../MovieCard/MovieCard";
import "../../Pages/LandingPage.css";

const Community = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    // Get top trending TV
    fetch(`${API_BASE}/api/tmdb/trending/movies`)
      .then((res) => res.json())
      .then((data) => {
        const results = data.results || [];
        setShows(results.slice(0, 6)); // Only top 6
      })
      .catch((err) =>
        console.error("Error fetching Community Spotlight TV:", err)
      );
  }, []);

  return (
    <section className="trending-section">
      <div className="container">

        <div className="trending-header fade-in-up">
          <h2 className="section-title">Community Spotlight</h2>
          <a href="/community-lists" className="view-all-link">
            View All →
          </a>
        </div>

        <div className="movies-grid community-grid">
          {shows.map((show, index) => (
            <MovieCard
              key={show.id}
              title={show.name || show.original_name}
              posterUrl={
                show.poster_path
                  ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                  : null
              }
              rating={Math.round((show.vote_average || 0) / 2)}
              gradient={index % 2 === 0 ? "gradient-red" : "gradient-gray"}
              delay={index * 0.05}
              onClick={() =>
                console.log("Clicked Community Spotlight show:", show.name)
              }
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Community;
