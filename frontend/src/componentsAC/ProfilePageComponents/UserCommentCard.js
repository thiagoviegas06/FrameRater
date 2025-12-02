import React from 'react';
import { Box, Typography } from '@mui/material';

export default function CommentCard({
                                        movieTitle = 'Movie Title',
                                        commentText = 'This is a comment.',
                                    }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '4px',
                gap: 1,
                width: '100%',
                color: '#fff',
            }}
        >
            {/* Movie title */}
            <Typography
                variant="subtitle2"
                sx={{
                    fontWeight: 700,
                    lineHeight: 1.2,
                    color: 'inherit',
                    textAlign: 'left',
                }}
            >
                {movieTitle}
            </Typography>

            {/* Comment text */}
            <Typography
                variant="body2"
                sx={{
                    lineHeight: 1,
                    color: 'inherit',
                    textAlign: 'left',
                }}
            >
                {commentText}
            </Typography>
        </Box>
    );
}
