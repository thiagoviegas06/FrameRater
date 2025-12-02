import React from 'react';
import { Typography } from '@mui/material';

export default function SmartSummaryBox({ summary, fontSize }) {
    return (
        <Typography
            sx={{
                fontSize: fontSize || '0.85rem',
                color: 'white',
                lineHeight: 1.3,
            }}
        >
            {summary}
        </Typography>
    );
}
