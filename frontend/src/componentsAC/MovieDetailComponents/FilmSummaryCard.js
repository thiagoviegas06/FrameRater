import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import FilmTitleBar from './FilmTitleBar';
import SmartSummaryBox from './SmartSummaryBox';
import FilmInfoBar from './FilmInfoBar';
import NoInteractLikeCommentDisplayBar from '../GlobalComponents/NoInteractLikeCommentDisplayBar';
import AddToListButton from '../GlobalComponents/AddToListIcon';

export default function FilmCard({
                                     title,
                                     rating,
                                     year,
                                     imdbRating,
                                     matchPercent,
                                     fetchSummary,
                                     likes = 0,
                                     comments = 0,
                                     onAddClick,
                                 }) {
    const [summaryText, setSummaryText] = useState('');

    useEffect(() => {
        fetchSummary?.()
            .then(result => {
                if (typeof result === 'string') setSummaryText(result);
                else if (result?.text) setSummaryText(result.text);
                else setSummaryText('');
            })
            .catch(() => setSummaryText(''));
    }, [fetchSummary]);

    const CARD_HEIGHT = 120; // fixed height

    return (
        <Box
            sx={{
                position: 'relative',
                bgcolor: 'rgba(0,0,0,0.85)',
                p: 1,
                borderRadius: 1.5,
                boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
                display: 'flex',
                flexDirection: 'column',
                width: 'calc(100% - 32px)',
                maxWidth: 350,
                height: CARD_HEIGHT,       // fixed
                overflow: 'hidden',       // hide overflow, scroll inside content
            }}
        >
            {/* Top line: Title + Add */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 22 }}>
                <FilmTitleBar title={title} fontSize="0.85rem" />
                <AddToListButton size={18} onClick={onAddClick} />
            </Box>

            {/* Scrollable content */}
            <Box sx={{ overflowY: 'auto', mt: 0.5, flex: 1 }}>
                {/* Info + Likes/Comments */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3, mb: 0.5 }}>

                    <NoInteractLikeCommentDisplayBar
                        likes={likes}
                        comments={comments}
                        fontSize="0.65rem"
                    />
                </Box>

                {/* Smart Summary */}
                <SmartSummaryBox
                    fetchSummary={async () => summaryText || 'No summary available.'}
                    fontSize="0.8rem"
                />
            </Box>
        </Box>
    );
}
