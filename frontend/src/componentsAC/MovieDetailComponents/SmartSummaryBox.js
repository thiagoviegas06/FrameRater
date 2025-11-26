import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

/**
 * SmartSummaryBox
 * Displays a "Smart Summary" title and a truncated summary from a DB/API call.
 *
 * Props:
 *  - fetchSummary: async function that returns a string (the summary)
 */
export default function SmartSummaryBox({ fetchSummary }) {
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const getSummary = async () => {
            try {
                const text = await fetchSummary();
                if (isMounted) {
                    const truncated = text.length > 175 ? text.slice(0, 175) + '...' : text;
                    setSummary(truncated || 'Summary not available');
                }
            } catch {
                if (isMounted) {
                    setSummary('Summary not available');
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        getSummary();

        return () => {
            isMounted = false;
        };
    }, [fetchSummary]);

    return (
        <Box
            sx={{
                bgcolor: 'none',
                borderRadius: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: .2,
            }}
        >
            <Typography
                sx={{
                    fontWeight: 700,
                    fontSize: '.8rem',
                    color: 'white',
                }}
            >
                Smart Summary
            </Typography>

            <Typography
                sx={{
                    fontWeight: 400,
                    fontSize: '0.7rem',
                    color: 'white',
                    textAlign: 'left',
                }}
            >
                {loading ? 'Loading...' : summary}
            </Typography>
        </Box>
    );
}
