import React from 'react';
import { Box, Typography } from '@mui/material';
import CommentIconBar from '../GlobalComponents/CommentIconBar';

export default function CommentCard({
        movieTitle = 'Movie Title',
        commentText = 'This is a comment.',
        likes = 0,
        replies = 0,
        onViewClick,
        onLikeClick,
        onReplyClick,
    } ) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '4px',
                gap: 1, // slightly more space for subtle padding
                width: '100%',
                color: '#fff', // all text white

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

            {/* Icon bar */}
            <Box
                sx={{
                    mt: 0,
                    display: 'flex',
                    alignItems: 'center',
                    color: '#ddd', // slightly lighter than white

                }}
            >
                <CommentIconBar
                    likes={likes}
                    replies={replies}
                    onViewClick={onViewClick}
                    onLikeClick={onLikeClick}
                    onReplyClick={onReplyClick}
                />
            </Box>
        </Box>
    );
}
