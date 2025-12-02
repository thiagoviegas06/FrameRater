// src/Pages/MoviesPage.jsx
import React from "react";
import MovieCarouselSection from "../MovieCard/CarouselSection";
import "./Lists.css";

const MoviePage = () => {
  return (
    <main className="movies-page-container">
      {/* 1. Trending Now */}
      <MovieCarouselSection
        title="Trending Now"
        endpoint="/api/tmdb/trending/movies"
        gradient="gradient-red"
      />

      {/* 2. Top Rated */}
      <MovieCarouselSection
        title="Top Rated"
        endpoint="/api/tmdb/top-rated/movies"
        gradient="gradient-gray"
      />

      {/* 3. Now Playing */}
      <MovieCarouselSection
        title="Now Playing"
        endpoint="/api/tmdb/now-playing/movies"
        gradient="gradient-red"
      />

      {/* 4. Coming Soon */}
      <MovieCarouselSection
        title="Coming Soon"
        endpoint="/api/tmdb/upcoming/movies"
        gradient="gradient-gray"
      />
    </main>
  );
};

export default MoviePage;
