import React, { useState } from 'react';
import { Box, Typography, Link } from '@mui/material';

export default function AboutGenreCastCard({ about = '', genres = [], cast = [] }) {
    const [expanded, setExpanded] = useState(false);
    const MAX_LENGTH = 150;

    const shouldTruncate = about.length > MAX_LENGTH;
    const displayedText = !expanded && shouldTruncate ? about.slice(0, MAX_LENGTH) + '...' : about;

    return (
        <Box sx={{ display: 'flex', gap: 2, bgcolor: 'transparent', p: 2, borderRadius: 2, width: '100%' }}>
            {/* About */}
            <Box sx={{ flex: 2.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: 'white' }}>About</Typography>
                <Typography sx={{ fontWeight: 400, fontSize: '0.95rem', color: 'white', paddingRight: 2 }}>
                    {displayedText}
                    {shouldTruncate && (
                        <Link
                            component="button"
                            sx={{ ml: 0.5, fontSize: '0.85rem' }}
                            onClick={() => setExpanded(!expanded)}
                        >
                            {expanded ? 'Show Less' : 'Continue'}
                        </Link>
                    )}
                </Typography>
            </Box>

            {/* Genre + Cast */}
            <Box sx={{ flex: 1.25, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: 'white' }}>Genre</Typography>
                    <Typography sx={{ fontWeight: 400, fontSize: '0.9rem', color: 'white' }}>
                        {genres.length > 0 ? genres.join(', ') : 'No genres available'}
                    </Typography>
                </Box>

                <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: 'white' }}>Cast</Typography>
                    <Typography sx={{ fontWeight: 400, fontSize: '0.9rem', color: 'white' }}>
                        {cast.length > 0 ? cast.join(', ') : 'No cast available'}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
