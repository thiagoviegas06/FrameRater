// src/Pages/MoviesPage.jsx
import React from "react";
import CarouselSection from "../MovieCard/CarouselSection";
import "./Lists.css";

const TvShows = () => {
  return (
    <main className="movies-page-container">
      {/* 1. Trending Now */}
      <CarouselSection
        title="Trending Now"
        endpoint="/api/tmdb/trending/tv"
        gradient="gradient-red"
      />

      {/* 2. Top Rated */}
      <CarouselSection
        title="Top Rated"
        endpoint="/api/tmdb/top-rated/tv"
        gradient="gradient-gray"
      />

      {/* 3. Discover */}
      <CarouselSection
        title="Now Playing"
        endpoint="/api/tmdb/discover/tv"
        gradient="gradient-red"
      />

      {/* 4. Popular */}
      <CarouselSection
        title="Coming Soon"
        endpoint="/api/tmdb/popular/tv"
        gradient="gradient-gray"
      />
    </main>
  );
};

export default TvShows;