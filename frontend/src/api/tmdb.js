import { API_BASE } from "./config";

// Generic helper
async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`TMDB API error ${res.status}: ${text}`);
  }
  return res.json();
}

// Trending movies
export async function getTrendingMovies() {
  const data = await getJson(`${API_BASE}/api/tmdb/trending/movies`);
  // TMDB-style responses - results: [...]
  return data.results || [];
}

// Search movies by query
export async function searchMovies(query) {
  const encoded = encodeURIComponent(query);
  const data = await getJson(
    `${API_BASE}/api/tmdb/search/movies?q=${encoded}`
  );
  return data.results || [];
}

// Movie details by TMDB ID
export async function getMovieDetails(movieId) {
  return getJson(`${API_BASE}/api/tmdb/movie/${movieId}`);
}

// Recommendations for a movie
export async function getMovieRecommendations(movieId) {
  const data = await getJson(
    `${API_BASE}/api/tmdb/movie/${movieId}/recommendations`
  );
  return data.results || [];
}

// Credits (cast/crew)
export async function getMovieCredits(movieId) {
  return getJson(`${API_BASE}/api/tmdb/movie/${movieId}/credits`);
}
