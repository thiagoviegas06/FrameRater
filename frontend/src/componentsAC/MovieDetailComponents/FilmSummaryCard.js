import React from 'react';
import { Box, Typography } from '@mui/material';
import AddToListButton from '../GlobalComponents/AddToListIcon';

export default function FilmCard({
                                     title,
                                     rating,
                                     year,
                                     onAddClick,
                                 }) {

    const CARD_HEIGHT = 70;

    // Convert rating → 5-star scale
    // If rating <= 10, treat it as 0–10 and convert.
    const starRating = rating
        ? rating > 5
            ? Math.round((rating / 10) * 5)
            : Math.round(rating)
        : 0;

    const renderStars = count =>
        '★★★★★☆☆☆☆☆'.slice(5 - count, 10 - count);
    // Result: 0→☆☆☆☆☆ , 3→★★★☆☆ , 5→★★★★★

    return (
        <Box
            sx={{
                position: 'relative',
                bgcolor: 'rgba(0,0,0,0.85)',
                p: 1,
                borderRadius: 1.5,
                boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
                display: 'flex',
                flexDirection: 'column',
                width: 'calc(100% - 32px)',
                maxWidth: 350,
                height: CARD_HEIGHT,
                justifyContent: 'center',
            }}
        >
            {/* Row 1: Title + Add */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        color: 'white',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '80%',
                    }}
                >
                    {title}
                </Typography>

                <AddToListButton size={18} onClick={onAddClick} />
            </Box>

            {/* Row 2: Stars + Year */}
            <Typography
                sx={{
                    mt: 0.5,
                    fontSize: '0.8rem',
                    color: 'white',
                    opacity: 0.9,
                }}
            >
                {renderStars(starRating)} • {year}
            </Typography>
        </Box>
    );
}
