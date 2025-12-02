
// src/Pages/MoviesPage.jsx
import React from "react";
import CarouselSection from "../MovieCard/CarouselSection";
import "./Lists.css";

const PublicLists = () => {
return (
    <main className="movies-page-container">
      {/* 1. Trending Films */}
    <CarouselSection
        title="Trending Films"
        endpoint="/api/tmdb/trending/movies"
        gradient="gradient-red"
    />

      {/* 2. Trendign Shows */}
    <CarouselSection
        title="Trending Shows"
        endpoint="/api/tmdb/trending/tv"
        gradient="gradient-gray"
    />

      {/* 3. Discover */}
    <CarouselSection
        title="Discover Shows"
        endpoint="/api/tmdb/discover/tv"
        gradient="gradient-red"
    />

      {/* 4. Discover */}
    <CarouselSection
        title="Discover Films"
        endpoint="/api/tmdb/discover/movies"
        gradient="gradient-gray"
    />
    </main>
);
};

export default PublicLists;