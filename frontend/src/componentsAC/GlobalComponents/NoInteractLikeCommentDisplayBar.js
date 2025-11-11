import React from 'react';
import { Box, Typography } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

/**
 * CommentIconBarStatic
 * Displays likes and comment counts only (non-interactive)
 *
 * Props:
 *  - likes: number of likes
 *  - comments: number of comments
 */
export default function CommentIconBarStatic({ likes = 0, comments = 0 }) {
    const iconSize = '13px';

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                fontSize: '0.8rem',
                color: '#fff',
            }}
        >
            {/* Likes */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ThumbUpOutlinedIcon sx={{ fontSize: iconSize, color: 'white' }} />
                <Typography sx={{ fontSize: '0.8rem' }}>{likes}</Typography>
            </Box>

            {/* Comments */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ChatBubbleOutlineIcon sx={{ fontSize: iconSize, color: 'white' }} />
                <Typography sx={{ fontSize: '0.8rem' }}>{comments}</Typography>
            </Box>
        </Box>
    );
}
