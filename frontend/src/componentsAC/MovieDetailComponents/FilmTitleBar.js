import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * FilmTitleBar
 * Displays the title of a film at the top of a card.
 *
 * Props:
 *  - title: string
 */
export default function FilmTitleBar({ title }) {
    return (
        <Box
            sx={{
                width: '100%',
                py: 1,
                bgcolor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}
        >
            <Typography
                sx={{
                    fontWeight: 700,
                    fontSize: '1rem', // bigger than other bars
                    color: 'white',
                    textAlign: 'left',
                    lineHeight: 1.2,
                }}
            >
                {title}
            </Typography>
        </Box>
    );
}
