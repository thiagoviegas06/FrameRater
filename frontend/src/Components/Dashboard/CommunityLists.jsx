
// src/Pages/CommunityLists.jsx  (or FavoritesPage.jsx)
import React from "react";
import CarouselSection from "../MovieCard/CarouselSection";
import "../Lists/Lists.css";


const CommunityLists = () => {
  return (
    <main className="movies-page-container">
      <CarouselSection
        title="Your Favorites"
        endpoint="/api/favorites/movies"
        gradient="gradient-red"
      />
    </main>
  );
};

export default CommunityLists;