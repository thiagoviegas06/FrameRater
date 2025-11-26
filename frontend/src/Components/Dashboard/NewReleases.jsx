import React from "react";
import "../../Pages/Dashboard.css";
import MovieCard from "../MovieCard/MovieCard";

const newReleasesData = [
  { id: 1, title: "Dune: Part Two", rating: 5, gradient: "gradient-red" },
  { id: 2, title: "Poor Things", rating: 4, gradient: "gradient-gray" },
  { id: 3, title: "The Zone of Interest", rating: 5, gradient: "gradient-red" },
  { id: 4, title: "Killers of the Flower Moon", rating: 5, gradient: "gradient-red" },
  { id: 5, title: "Oppenheimer", rating: 5, gradient: "gradient-red" },
  { id: 6, title: "The Holdovers", rating: 4, gradient: "gradient-gray" },
];

const NewReleases = () => {
  const handleCardClick = (movie) => {
    // For overlay

    console.log("Clicked movie:", movie.title);
  };

  return (
    <div className="container">
      <section className="movies-section">
        <div className="movies-header fade-in-up">
          <h2 className="section-title">New Releases</h2>
          <button className="view-all-link">View All →</button>
        </div>

        <div className="movies-grid">
          {newReleasesData.map((movie, index) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              rating={movie.rating}
              gradient={movie.gradient}
              delay={index * 0.1}
              onClick={() => handleCardClick(movie)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default NewReleases;
