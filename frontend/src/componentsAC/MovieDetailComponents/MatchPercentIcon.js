import React, { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

/**
 * MatchPercentageBar
 * Displays the estimated user match percentage for a film.
 *
 * Props:
 *  - fetchMatch: async function that returns a number between 0-100
 */
export default function MatchPercentageBar({ fetchMatch }) {
    const [match, setMatch] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const getMatch = async () => {
            try {
                const value = await fetchMatch();
                if (isMounted) {
                    setMatch(typeof value === 'number' ? value : null);
                }
            } catch {
                if (isMounted) setMatch(null);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        getMatch();

        return () => {
            isMounted = false;
        };
    }, [fetchMatch]);

    return (
        <Box
            sx={{
                bgcolor: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                py: 1,
            }}
        >
            <Typography
                sx={{
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: 'white',
                    textAlign: 'left',
                }}
            >
                {loading
                    ? 'Loading match...'
                    : match !== null
                        ? `${match}% User Match`
                        : 'User Match not available'}
            </Typography>

            {/* Optional visual bar */}
            {match !== null && (
                <LinearProgress
                    variant="determinate"
                    value={match}
                    sx={{
                        height: 8,
                        borderRadius: 1,
                        backgroundColor: '#333',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: '#4caf50',
                        },
                    }}
                />
            )}
        </Box>
    );
}
