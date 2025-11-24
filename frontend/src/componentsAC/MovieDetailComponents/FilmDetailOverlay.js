// ./componentsAC/MovieDetailComponents/FilmDetailOverlay.jsx
import React from 'react';
import { Box } from '@mui/material';
import OverlayFrame from '../GlobalComponents/OverlayFrame';
import FilmDetailBanner from './FilmDetailBanner';
import FilmSummaryCard from './FilmSummaryCard';
import SummaryGenreCastCard from './SummaryGenreCastCard';
import AlwaysVisTextBox from './AlwaysVisTextBox';
import ReviewsFilterBar from '../GlobalComponents/ReviewsFilterBar';
import GlobalCommentCard from '../GlobalComponents/GlobalCommentCard';
import CloseButton from '../GlobalComponents/overlayXit';

export default function FilmDetailOverlay({
                                              open = false,
                                              bannerImage,
                                              movieTitle = 'Movie Title',
                                              summaryText = 'This is a summary of the movie...',
                                              genreCastData = {},
                                              userNotes = '',
                                              comments = [],
                                              onClose,
                                          }) {
    const BANNER_HEIGHT = 240;

    return (
        <OverlayFrame open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'relative',
                    width: 500,
                    maxHeight: 'calc(100vh - 40px)',
                    mt: '40px',
                    bgcolor: 'rgba(20, 20, 20, 0.9)',
                    borderRadius: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 0 25px rgba(192,192,192,0.05)',
                    zIndex: 1200,
                    backdropFilter: 'blur(8px)',
                    overflow: 'hidden', // clip outer edges, inner scroll will work
                }}
            >
                {/* Close button */}
                <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 20 }}>
                    <CloseButton onClick={onClose} />
                </Box>

                {/* Banner & Summary Card */}
                <Box sx={{ position: 'relative', height: BANNER_HEIGHT, flexShrink: 0 }}>
                    <FilmDetailBanner image={bannerImage} height={BANNER_HEIGHT} />
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 16,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '100%',
                            maxWidth: 350,
                            zIndex: 10,
                        }}
                    >
                        <FilmSummaryCard
                            title={movieTitle}
                            fetchSummary={async () => summaryText}
                            rating={genreCastData.rating}
                            year={genreCastData.year}
                            imdbRating={genreCastData.imdbRating}
                        />
                    </Box>
                </Box>

                {/* Scrollable content */}
                <Box
                    sx={{
                        overflowY: 'auto', // ⚡ internal scroll
                        flexGrow: 1,
                        px: 3,
                        mt: 2,
                        pb: 2,
                    }}
                >
                    {/* Summary / Genre / Cast */}
                    <SummaryGenreCastCard data={genreCastData} />

                    {/* Notes */}
                    <Box sx={{ mt: 2, width: '90%', mx: 'auto' }}>
                        <AlwaysVisTextBox
                            initialText={userNotes}
                            onSave={(text) => console.log('Notes saved', text)}
                        />
                    </Box>

                    {/* Reviews Filter */}
                    <Box sx={{ mt: 2 }}>
                        <ReviewsFilterBar
                            onFilterChange={(filter) => console.log('Filter selected', filter)}
                        />
                    </Box>

                    {/* Comments */}
                    <Box sx={{ mt: 1 }}>
                        {comments.length > 0 ? (
                            comments.map((c, idx) => (
                                <Box key={idx} sx={{ mb: 2 }}>
                                    <GlobalCommentCard
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
            </Box>
        </OverlayFrame>
    );
}
