// src/Components/Movies/CarouselSection.jsx
import React, { useEffect, useState } from "react";
import { API_BASE } from "../../api/config";
import { auth } from "../../firebase";
import MovieCard from "../MovieCard/MovieCard";

const VISIBLE_COUNT = 6;

const CarouselSection = ({
  title,
  endpoint,
  items,
  gradient = "gradient-red",
  isPeople = false,
}) => {
  const [movies, setMovies] = useState(
    Array.isArray(items) ? items : []
  );
  const [startIndex, setStartIndex] = useState(0);

  // favorites start EMPTY and only populate when hearting
  const [favoriteIds, setFavoriteIds] = useState(new Set());

  // Load movies from the given endpoint OR use passed-in items
  useEffect(() => {
    let isMounted = true;

    // When items prop is provided (even if it's an empty array)
    if (items !== undefined) {
      const normalized = Array.isArray(items) ? items : [];
      if (isMounted) {
        setMovies(normalized);
        setStartIndex(0);
      }
      return () => {
        isMounted = false;
      };
    }

    // If no items, no endpoint → error
    if (!endpoint) {
      console.warn(
        "CarouselSection: no endpoint or items provided for",
        title
      );
      if (isMounted) {
        setMovies([]);
        setStartIndex(0);
      }
      return () => {
        isMounted = false;
      };
    }

    // Main method e.g. (PublicLists, Movies page, etc.) → fetch from endpoint
    const fetchMovies = async () => {
      try {
        const user = auth.currentUser;
        const headers = {};

        // Attach auth if we have a user
        if (user) {
          const token = await user.getIdToken();
          headers.Authorization = `Bearer ${token}`;
        }

        const url = `${API_BASE}${endpoint}`;
        console.log("📡 CarouselSection fetching:", {
          title,
          endpoint,
          url,
          authed: !!user,
        });

        const res = await fetch(url, { headers });

        if (!res.ok) {
          const text = await res.text();
          console.error(
            `Fetch failed for ${title} (${endpoint}):`,
            res.status,
            res.statusText,
            text.slice(0, 200)
          );
          if (isMounted) setMovies([]);
          return;
        }

        const data = await res.json();
        const itemsFromApi = Array.isArray(data)
          ? data
          : Array.isArray(data.results)
          ? data.results
          : Array.isArray(data.recommendations)
          ? data.recommendations
          : [];

        if (isMounted) {
          setMovies(itemsFromApi);
          setStartIndex(0);
        }
      } catch (err) {
        console.error(`Error fetching movies for ${title}:`, err);
        if (isMounted) setMovies([]);
      }
    };

    fetchMovies();
    return () => {
      isMounted = false;
    };
  }, [endpoint, title, items]);

  // Handle heart click (add/remove favorite + sync to backend)
  const handleToggleFavorite = async (movieId, nextIsFavorite) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please sign in to favorite movies.");
      return;
    }

    try {
      const token = await user.getIdToken();
      const method = nextIsFavorite ? "POST" : "DELETE";

      const res = await fetch(`${API_BASE}/api/favorites/movies/${movieId}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.error("Favorite toggle failed:", res.status);
        return;
      }

      // Update local favorite IDs set
      setFavoriteIds((prev) => {
        const copy = new Set(prev);
        if (nextIsFavorite) {
          copy.add(movieId);
        } else {
          copy.delete(movieId);
        }
        return copy;
      });
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  // carousel controls

const handlePrev = () => {
  setStartIndex((prev) => Math.max(prev - VISIBLE_COUNT, 0));
};

const handleNext = () => {
  setStartIndex((prev) =>
    Math.min(prev + VISIBLE_COUNT, Math.max(0, moviesArray.length - VISIBLE_COUNT))
  );
};

  const moviesArray = Array.isArray(movies) ? movies : [];
  const visibleMovies = moviesArray.slice(startIndex, startIndex + VISIBLE_COUNT);
  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + VISIBLE_COUNT < moviesArray.length;

  // Debug
  console.log("CarouselSection", {
    title,
    endpoint,
    itemsProvided: items !== undefined,
    moviesType: typeof movies,
    moviesIsArray: Array.isArray(movies),
    moviesCount: moviesArray.length,
  });

  return (
    <section className="movies-section">
      <div className="movies-header fade-in-up">
        <h2 className="section-title">{title}</h2>
        <button className="view-all-link">View All →</button>
      </div>

      {/* Empty state when no movies */}
      {moviesArray.length === 0 ? (
        <p style={{ color: "#a1a1aa", padding: "0 1.5rem 2rem" }}>
          No movies to show here yet.
        </p>
      ) : (
        <div className="movies-carousel">
          <button
            className="carousel-btn carousel-btn-prev"
            onClick={handlePrev}
            disabled={!canGoPrev}
          >
            ‹
          </button>

          <div className="movies-grid movies-grid--single-row">
            {visibleMovies.map((movie, index) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title || movie.name}
                posterUrl={
                  // People → use profile_path
                  isPeople
                    ? movie.profile_path
                      ? `https://image.tmdb.org/t/p/w500${movie.profile_path}`
                      : null
                    // Movies / TV → use poster_path
                    : movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : null
                }
                rating={Math.round((movie.vote_average || 0) / 2)}
                gradient={gradient}
                delay={index * 0.05}
                isFavorite={favoriteIds.has(movie.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>

          <button
            className="carousel-btn carousel-btn-next"
            onClick={handleNext}
            disabled={!canGoNext}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
};

export default CarouselSection;
