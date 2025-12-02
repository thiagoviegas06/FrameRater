import React from 'react';
import { Box } from '@mui/material';
import OverlayFrameXL from '../GlobalComponents/OverlayFrameXL';
import FilmDetailBanner from './FilmDetailBanner';
import FilmSummaryCard from './FilmSummaryCard';
import AboutGenreCastCard from './AboutGenreCastCard';
import CloseButton from '../GlobalComponents/overlayXit';

export default function FilmDetailOverlay({
                                              open = false,
                                              bannerImage,
                                              movieTitle = 'Movie Title',
                                              summaryText = 'No summary available',
                                              genreCastData = {},
                                              onClose,
                                          }) {
    const MAX_SUMMARY_WIDTH = 350;

    return (
        <OverlayFrameXL open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'relative',
                    width: 500,
                    maxHeight: '90vh',
                    bgcolor: 'rgba(20, 20, 20, 0.95)',
                    borderRadius: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    boxShadow: '0 0 25px rgba(192,192,192,0.05)'
                }}
            >
                {/* Close Button */}
                <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 20 }}>
                    <CloseButton onClick={onClose} />
                </Box>

                {/* Pinned Banner - 50% of overlay height */}
                <Box
                    sx={{
                        position: 'relative',
                        height: '50%',    // not hard-coded — dynamic!
                        width: '100%',
                        flexShrink: 0,
                    }}
                >
                    {bannerImage ? (
                        <FilmDetailBanner image={bannerImage} height="100%" />
                    ) : (
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
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

                    {/* Summary Card overlay */}
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

                <Box
                    sx={{
                        overflowY: 'auto',
                        flexGrow: 1,
                        px: 3,
                        pt: 2,
                        WebkitOverflowScrolling: "touch",
                    }}
                >
                    <AboutGenreCastCard
                        about={summaryText}
                        genres={genreCastData.genres || []}
                        cast={(genreCastData.cast || []).slice(0, 3)}
                    />
                </Box>

            </Box>
        </OverlayFrameXL>
    );
}
