import React, { useEffect, useState } from 'react';
import FilmDetailOverlay from './FilmDetailOverlay';
import { getMovieDetails, getMovieCredits, searchMovies } from '../../api/tmdb';
import { auth } from '../../firebase';

export default function FilmDetailFetcher({ movieId, movieTitle, posterUrl, rating, year, open, onClose }) {
    const [realId, setRealId] = useState(movieId);
    const [movieDetails, setMovieDetails] = useState(null);
    const [credits, setCredits] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // subscribe to Firebase auth state
        const unsubscribe = auth.onAuthStateChanged(u => {
            setUser(u); // will be null if not logged in
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!open) return;

        let cancelled = false;

        const fetchData = async () => {
            try {
                let idToUse = realId;
                if (!idToUse && movieTitle) {
                    const searchResults = await searchMovies(movieTitle);
                    idToUse = searchResults[0]?.id;
                    setRealId(idToUse);
                }

                if (!idToUse) throw new Error('Could not determine movie ID');

                const detailsData = await getMovieDetails(idToUse);
                const creditsData = await getMovieCredits(idToUse);

                if (!cancelled) {
                    setMovieDetails(detailsData);
                    setCredits(creditsData);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();

        return () => {
            cancelled = true;
        };
    }, [realId, movieTitle, open]);

    const genreCastData = {
        rating: rating || (movieDetails?.vote_average ? movieDetails.vote_average / 2 : 0),
        year: year || (movieDetails?.release_date ? movieDetails.release_date.split('-')[0] : ''),
        imdbRating: movieDetails?.imdb_rating || null,
        genres: movieDetails?.genres?.map(g => g.name) || [],
        cast: credits?.cast?.slice(0, 5).map(c => c.name) || [],
    };

    // Only pass comments if logged in
    const visibleComments = user ? movieDetails?.comments || [] : [];

    return (
        <FilmDetailOverlay
            open={open}
            onClose={onClose}
            bannerImage={posterUrl || (movieDetails?.poster_path && `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`)}
            movieTitle={movieTitle}
            summaryText={movieDetails?.overview || 'No summary available'}
            genreCastData={genreCastData}
            user={user}
            comments={visibleComments}
        />
    );
}
