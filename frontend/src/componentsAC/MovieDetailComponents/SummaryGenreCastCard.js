import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * AboutGenreCastCard
 * Displays About, Genre, and Cast in a single card layout.
 *
 * Props:
 *  - fetchAbout: async function returning IMDB summary
 *  - fetchGenres: async function returning array of genres
 *  - fetchCast: async function returning array of cast members
 */
export default function AboutGenreCastCard({ fetchAbout, fetchGenres, fetchCast }) {
    const [about, setAbout] = React.useState('');
    const [genres, setGenres] = React.useState([]);
    const [cast, setCast] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        let isMounted = true;

        const fetchAll = async () => {
            try {
                const [aboutText, genreList, castList] = await Promise.all([
                    fetchAbout(),
                    fetchGenres(),
                    fetchCast(),
                ]);

                if (isMounted) {
                    // truncate about to 175 chars
                    const truncatedAbout =
                        aboutText.length > 175 ? aboutText.slice(0, 175) + '...' : aboutText;

                    setAbout(truncatedAbout || 'Summary not available');
                    setGenres(genreList || []);
                    setCast(castList || []);
                }
            } catch {
                if (isMounted) {
                    setAbout('Summary not available');
                    setGenres([]);
                    setCast([]);
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchAll();

        return () => {
            isMounted = false;
        };
    }, [fetchAbout, fetchGenres, fetchCast]);

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 2,
                bgcolor: 'transparent',
                p: 2,
                borderRadius: 2,
                boxShadow: 3,
                width: '100%',
            }}
        >
            {/* Left: About (3/4 width) */}
            <Box sx={{ flex: 2.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography
                    sx={{
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: 'white',
                    }}
                >
                    About
                </Typography>
                <Typography
                    sx={{
                        fontWeight: 400,
                        fontSize: '0.95rem',
                        color: 'white',
                        textAlign: 'left',
                    }}
                >
                    {loading ? 'Loading...' : about}
                </Typography>
            </Box>

            {/* Right: Genre + Cast (1/4 width, stacked) */}
            <Box sx={{ flex: 1.25, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography
                        sx={{
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            color: 'white',
                        }}
                    >
                        Genre
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: 400,
                            fontSize: '0.9rem',
                            color: 'white',
                        }}
                    >
                        {loading
                            ? 'Loading...'
                            : genres.length > 0
                                ? genres.join(', ')
                                : 'No genres available'}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography
                        sx={{
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            color: 'white',
                        }}
                    >
                        Cast
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: 400,
                            fontSize: '0.9rem',
                            color: 'white',
                        }}
                    >
                        {loading
                            ? 'Loading...'
                            : cast.length > 0
                                ? cast.join(', ')
                                : 'No cast available'}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
