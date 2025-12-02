import React from 'react';
import { Box } from '@mui/material';
import OverlayFrameXL from '../GlobalComponents/OverlayFrameXL';
import FilmDetailBanner from './FilmDetailBanner';
import FilmSummaryCard from './FilmSummaryCard';
import AboutGenreCastCard from './AboutGenreCastCard';
import AlwaysVisTextBox from './AlwaysVisTextBox';
import ReviewsFilterBar from '../GlobalComponents/ReviewsFilterBar';
import GlobalCommentCard from '../GlobalComponents/GlobalCommentCard';
import CloseButton from '../GlobalComponents/overlayXit';

export default function FilmDetailOverlay({
                                              open = false,
                                              bannerImage,
                                              movieTitle = 'Movie Title',
                                              summaryText = 'No summary available',
                                              genreCastData = {},  // { rating, year, imdbRating, genres: [], cast: [] }
                                              userNotes = '',
                                              comments = [],
                                              user = null,
                                              onClose,
                                          }) {
    const BANNER_HEIGHT = 240;
    const MAX_SUMMARY_WIDTH = 350;

    return (
        <OverlayFrameXL open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'relative',
                    width: 500,
                    maxHeight: '90vh',
                    bgcolor: 'rgba(20, 20, 20, 0.9)',
                    borderRadius: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    boxShadow: '0 0 25px rgba(192,192,192,0.05)',
                }}
            >
                {/* Close Button */}
                <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 20 }}>
                    <CloseButton onClick={onClose} />
                </Box>

                {/* Banner & FilmSummaryCard */}
                <Box sx={{ position: 'relative', flexShrink: 0 }}>
                    {bannerImage ? (
                        <FilmDetailBanner image={bannerImage} height={BANNER_HEIGHT} />
                    ) : (
                        <Box
                            sx={{
                                width: '100%',
                                height: BANNER_HEIGHT,
                                bgcolor: '#222',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#888',
                                fontSize: 16,
                            }}
                        >
                            No Image Available
                        </Box>
                    )}

                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 16,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '100%',
                            maxWidth: MAX_SUMMARY_WIDTH,
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
                {/* Scrollable content */}
                <Box sx={{ overflowY: 'auto', flexGrow: 1, px: 3, mt: 2, pb: 2 }}>

                    {/* About, Genre, Cast */}
                    <AboutGenreCastCard
                        about={summaryText}
                        genres={genreCastData.genres || []}
                        cast={(genreCastData.cast || []).slice(0, 3)}
                    />

                    {/* If NOT logged in → show the login message and END */}
                    {!user && (
                        <Box
                            sx={{
                                color: '#aaa',
                                textAlign: 'center',
                                mt: 4,
                                fontWeight: '600',
                                paddingBottom: 5,
                            }}
                        >
                            Login to Join the Conversation
                        </Box>
                    )}

                    {/* If logged in → show text box + reviews + comments */}
                    {user && (
                        <>
                            {/* Write-a-review box */}
                            <Box sx={{ mt: 2, width: '90%', mx: 'auto' }}>
                                <AlwaysVisTextBox
                                    initialText={userNotes}
                                    onSave={(text) => console.log('Notes saved', text)}
                                />
                            </Box>

                            {/* Reviews filter */}
                            <Box sx={{ mt: 2 }}>
                                <ReviewsFilterBar
                                    onFilterChange={(filter) => console.log('Filter selected', filter)}
                                />
                            </Box>

                            {/* Comments */}
                            <Box sx={{ mt: 1 }}>
                                {comments && comments.length > 0 ? (
                                    comments.map((c, idx) => (
                                        <Box key={idx} sx={{ mb: 2 }}>
                                            <GlobalCommentCard
                                                userName={c.userName}
                                                userIconProps={{ photoUrl: c.userPhoto }}
                                                commentText={c.commentText}
                                            />
                                        </Box>
                                    ))
                                ) : (
                                    <Box
                                        sx={{
                                            color: '#aaa',
                                            textAlign: 'center',
                                            mt: 4,
                                            fontWeight: 600,
                                            paddingBottom: 5,
                                        }}
                                    >
                                        No reviews yet.
                                    </Box>
                                )}
                            </Box>

                        </>
                    )}
                </Box>

            </Box>
        </OverlayFrameXL>
    );
}
