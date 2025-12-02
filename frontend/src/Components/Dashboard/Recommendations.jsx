// src/Pages/MoviesPage.jsx
import React from "react";
import CarouselSection from "../MovieCard/CarouselSection";
import "../Lists/Lists.css";

const Recommendations = () => {
  return (
    <main className="movies-page-container">
      {/* 1. Recommendations */}
    <CarouselSection
        title="Your Recommendations"
        endpoint="/api/recommendations"
        gradient="gradient-red"
    />
    </main>
);
};

export default Recommendations;