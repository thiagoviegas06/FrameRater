import React from 'react';
import { Box, Typography } from '@mui/material';
import MatchPercentIcon from './MatchPercentIcon';

export default function FilmInfoBar({ rating, year, imdbRating, matchPercent }) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                lineHeight: 1,
                flexWrap: 'wrap', // allow wrapping if space is tight
            }}
        >
            {rating && (
                <Typography
                    sx={{
                        fontSize: '0.75rem', // slightly larger
                        fontWeight: 600,
                        color: 'white',
                        lineHeight: 1.2,
                    }}
                >
                    {rating}
                </Typography>
            )}
            {year && (
                <Typography
                    sx={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'white',
                        lineHeight: 1.2,
                    }}
                >
                    {year}
                </Typography>
            )}
            {typeof matchPercent === 'number' && (
                <MatchPercentIcon percent={matchPercent} size={12} />
            )}
            {imdbRating && (
                <Typography
                    sx={{
                        fontSize: '0.75rem', // match other items
                        fontWeight: 600,
                        color: 'white',
                        lineHeight: 1.2,
                    }}
                >
                    IMDb: {imdbRating}
                </Typography>
            )}
        </Box>
    );
}
