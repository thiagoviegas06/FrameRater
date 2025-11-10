import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export default function CommentIconBar({
                                           initialLikes = 0,
                                           replies = 0,
                                           initiallyLiked = false, // userHasLiked initially
                                           onViewClick,
                                           onReplyClick,
                                       }) {
    const [liked, setLiked] = useState(initiallyLiked);
    const [likesCount, setLikesCount] = useState(initialLikes);

    const handleLikeClick = () => {
        if (liked) {
            setLiked(false);
            setLikesCount(likesCount - 1);
        } else {
            setLiked(true);
            setLikesCount(likesCount + 1);
        }
    };

    const iconSize = '16px';

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
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                    '&:hover': { color: 'rgba(255,255,255,0.6)', backgroundColor: '#000' },
                }}
                onClick={handleLikeClick}
            >
                {liked ? (
                    <ThumbUpIcon sx={{ fontSize: iconSize, color: 'white' }} />
                ) : (
                    <ThumbUpOutlinedIcon sx={{ fontSize: iconSize, color: 'white' }} />
                )}
                <Typography sx={{ fontSize: '0.8rem' }}>{likesCount}</Typography>
            </Box>

            {/* Replies */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                    '&:hover': { color: 'rgba(255,255,255,0.6)', backgroundColor: '#000' },
                }}
                onClick={onReplyClick}
            >
                <ChatBubbleOutlineIcon sx={{ fontSize: iconSize, color: 'white' }} />
                <Typography sx={{ fontSize: '0.8rem' }}>{replies}</Typography>
            </Box>

            {/* View Button */}
            <Button
                variant="text"
                size="small"
                sx={{
                    textTransform: 'none',
                    color: '#fff',
                    padding: 0,
                    minWidth: 'auto',
                    fontSize: '0.8rem',
                    lineHeight: 1,
                    '&:hover': {
                        bgcolor: 'transparent',
                        color: 'rgba(255,255,255,0.6)',
                    },
                }}
                onClick={onViewClick}
            >
                View
            </Button>
        </Box>
    );
}
