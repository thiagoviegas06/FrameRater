import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CommentIconBar from '../GlobalComponents/CommentIconBar';
import ReadOnlyProfileIcon from '../GlobalComponents/ReadOnlyProfileIcon';
import EditableTextBox from '../GlobalComponents/CommentReplyBox';

export default function GlobalCommentCard({
                                              userName = 'User Name',
                                              userIconProps = {},
                                              commentText = 'This is a comment.',
                                              likes = 0,
                                              replies = 0,
                                              onLikeClick,
                                              onAddReply, // new prop to append reply to comment chain
                                          }) {
    const ICON_SIZE = 40;
    const [showReplyBox, setShowReplyBox] = useState(false);

    const handleReplyClick = () => {
        setShowReplyBox((prev) => !prev);
    };

    const handleSendReply = (text) => {
        if (onAddReply) onAddReply(text);
        setShowReplyBox(false);
    };

    return (
        <Box sx={{ display: 'flex', width: '100%', gap: 1, color: '#fff', padding: 1, alignItems: 'flex-start' }}>
            {/* User Icon */}
            <Box sx={{ flexShrink: 0 }}>
                <ReadOnlyProfileIcon size={ICON_SIZE} {...userIconProps} />
            </Box>

            {/* Text Content */}
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 0.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                    {userName}
                </Typography>

                <Typography variant="body2" sx={{ lineHeight: 1.2 }}>
                    {commentText}
                </Typography>

                <CommentIconBar
                    likes={likes}
                    replies={replies}
                    onLikeClick={onLikeClick}
                    onReplyClick={handleReplyClick} // unified click handler
                />

                {/* Slide-out reply box */}
                {showReplyBox && (
                    <Box sx={{ mt: 1 }}>
                        <EditableTextBox initialText="" onSend={handleSendReply} />
                    </Box>
                )}
            </Box>
        </Box>
    );
}
