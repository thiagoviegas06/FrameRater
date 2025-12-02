// src/api/tmdb.js
import { API_BASE } from "./config";

// Generic fetch helper
async function getJson(url) {
    const res = await fetch(url);
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`TMDB API error ${res.status}: ${text}`);
    }
    return res.json();
}

// ================== MOVIES ==================

// Trending movies
export async function getTrendingMovies() {
    const data = await getJson(`${API_BASE}/api/tmdb/trending/movies`);
    return data.results || [];
}

export async function getPopularMovies() {
    const data = await getJson(`${API_BASE}/api/tmdb/popular/movies`);
    return data.results || [];
}

export async function getTopRatedMovies() {
    const data = await getJson(`${API_BASE}/api/tmdb/top-rated/movies`);
    return data.results || [];
}

export async function getUpcomingMovies() {
    const data = await getJson(`${API_BASE}/api/tmdb/upcoming/movies`);
    return data.results || [];
}

export async function getNowPlayingMovies() {
    const data = await getJson(`${API_BASE}/api/tmdb/now-playing/movies`);
    return data.results || [];
}

export async function getMovieDetails(movieId) {
    return getJson(`${API_BASE}/api/tmdb/movie/${movieId}`);
}

export async function getMovieCredits(movieId) {
    return getJson(`${API_BASE}/api/tmdb/movie/${movieId}/credits`);
}

export async function getMovieRecommendations(movieId) {
    const data = await getJson(`${API_BASE}/api/tmdb/movie/${movieId}/recommendations`);
    return data.results || [];
}

export async function searchMovies(query) {
    const encoded = encodeURIComponent(query);
    const data = await getJson(`${API_BASE}/api/tmdb/search/movies?q=${encoded}`);
    return data.results || [];
}

// ================== TV SHOWS ==================

export async function getTrendingShows() {
    const data = await getJson(`${API_BASE}/api/tmdb/trending/tv`);
    return data.results || [];
}

export async function getPopularShows() {
    const data = await getJson(`${API_BASE}/api/tmdb/popular/tv`);
    return data.results || [];
}

export async function getTopRatedShows() {
    const data = await getJson(`${API_BASE}/api/tmdb/top-rated/tv`);
    return data.results || [];
}

export async function getAiringTodayShows() {
    const data = await getJson(`${API_BASE}/api/tmdb/airing-today/tv`);
    return data.results || [];
}

export async function getOnTheAirShows() {
    const data = await getJson(`${API_BASE}/api/tmdb/on-the-air/tv`);
    return data.results || [];
}

export async function getTVDetails(tvId) {
    return getJson(`${API_BASE}/api/tmdb/tv/${tvId}`);
}

export async function getTVCredits(tvId) {
    return getJson(`${API_BASE}/api/tmdb/tv/${tvId}/credits`);
}

export async function getTVRecommendations(tvId) {
    const data = await getJson(`${API_BASE}/api/tmdb/tv/${tvId}/recommendations`);
    return data.results || [];
}

export async function searchShows(query) {
    const encoded = encodeURIComponent(query);
    const data = await getJson(`${API_BASE}/api/tmdb/search/tv?q=${encoded}`);
    return data.results || [];
}

// ================== CLIENT OBJECTS ==================

export const tmdb_client = {
    // Movies
    get_trending_movies: getTrendingMovies,
    get_popular_movies: getPopularMovies,
    get_top_rated_movies: getTopRatedMovies,
    get_upcoming_movies: getUpcomingMovies,
    get_now_playing_movies: getNowPlayingMovies,

    // TV Shows
    get_trending_shows: getTrendingShows,
    get_popular_shows: getPopularShows,
    get_top_rated_shows: getTopRatedShows,
    get_airing_today_shows: getAiringTodayShows,
    get_on_the_air_shows: getOnTheAirShows,
};
