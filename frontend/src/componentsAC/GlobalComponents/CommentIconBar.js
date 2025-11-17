import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export default function CommentIconBar({
                                           initialLikes = 0,
                                           replies = 0,
                                           initiallyLiked = false,
                                           onLikeClick,
                                           onReplyClick, // unified reply trigger
                                       }) {
    const [liked, setLiked] = useState(initiallyLiked);
    const [likesCount, setLikesCount] = useState(initialLikes);
    const iconSize = '16px';

    const handleLikeClick = () => {
        setLiked(!liked);
        setLikesCount(liked ? likesCount - 1 : likesCount + 1);
        if (onLikeClick) onLikeClick();
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: '0.8rem', color: '#fff' }}>
            {/* Like */}
            <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}
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
                sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}
                onClick={onReplyClick}
            >
                <ChatBubbleOutlineIcon sx={{ fontSize: iconSize, color: 'white' }} />
                <Typography sx={{ fontSize: '0.8rem' }}>{replies}</Typography>
            </Box>

            {/* Reply button */}
            <Button
                variant="text"
                size="small"
                sx={{ textTransform: 'none', color: '#fff', padding: 0, minWidth: 'auto', fontSize: '0.8rem' }}
                onClick={onReplyClick}
            >
                Reply
            </Button>
        </Box>
    );
}
