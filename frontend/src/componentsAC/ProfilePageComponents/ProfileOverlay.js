import React from 'react';
import { Box, Typography } from '@mui/material';
import ProfileBanner from './ProfileBanner';
import EditableProfileSummary from './EditableProfileSummary';
import ReviewsBar from '../GlobalComponents/ReviewsFilterBar';
import CommentCard from './UserCommentCard';
import CloseButton from '../GlobalComponents/overlayXit';
import ProfileIcon from '../GlobalComponents/ProfileIcon';
//TODO implement the comments highlighting
export default function ProfileOverlay({
        bannerText = 'Welcome to My Profile',
        profileImage,
        username = 'username',
        profileSummary = 'This is a short profile summary...',
        comments = [],
        onClose,
    }) {
    return (
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 500,
                height: 700,
                bgcolor: 'rgba(20, 20, 20, 0.9)',
                borderRadius: 3,
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 0 25px rgba(192,192,192,0.05)',
                zIndex: 1200, // ensures it's always above OverlayFrame
                backdropFilter: 'blur(8px)',
            }}
        >
            {/* Close button top-right */}
            <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 20 }}>
                <CloseButton onClick={onClose} />
            </Box>

            {/* Top banner */}
            <Box sx={{ width: '100%' }}>
                <ProfileBanner
                    initialText={bannerText}
                    onSave={(text, pos) => console.log('Banner saved', text, pos)}
                />
            </Box>

            {/* Profile photo and username */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: '-50px',
                    zIndex: 10,
                    px: 3,
                }}
            >
                <ProfileIcon src={profileImage} size={100} editable />
                <Typography
                    sx={{
                        color: 'silver',
                        fontWeight: 600,
                        fontSize: '1rem',
                        mt: 1,
                        textShadow: '0 0 5px rgba(255,255,255,0.15)',
                    }}
                >
                    @{username}
                </Typography>
            </Box>

            {/* Profile summary */}
            <Box sx={{ px: 3, mt: 1 }}>
                <EditableProfileSummary
                    initialText={profileSummary}
                    onSave={(text) => console.log('Summary saved', text)}
                />
            </Box>

            {/* Reviews bar */}
            <Box sx={{ mt: 2, px: 3 }}>
                <ReviewsBar
                    onFilterChange={(filter) => console.log('Filter selected', filter)}
                />
            </Box>

            {/* Comments section */}
            <Box
                sx={{
                    flex: 1,
                    mt: 1,
                    px: 3,
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        bgcolor: '#555',
                        borderRadius: 3,
                    },
                }}
            >
                {comments.length > 0 ? (
                    comments.map((c, idx) => (
                        <Box key={idx} sx={{ mb: 2 }}>
                            <CommentCard
                                movieTitle={c.movieTitle}
                                commentText={c.commentText}
                                likes={c.likes}
                                replies={c.replies}
                                onViewClick={() => console.log('View clicked', c)}
                                onLikeClick={() => console.log('Like clicked', c)}
                                onReplyClick={() => console.log('Reply clicked', c)}
                            />
                        </Box>
                    ))
                ) : (
                    <Box sx={{ color: '#aaa', textAlign: 'center', mt: 4 }}>
                        No comments yet.
                    </Box>
                )}
            </Box>
        </Box>
    );
}
