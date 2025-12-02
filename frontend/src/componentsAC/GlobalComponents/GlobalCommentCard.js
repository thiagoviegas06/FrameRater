import React from 'react';
import { Box, Typography } from '@mui/material';
import ReadOnlyProfileIcon from '../GlobalComponents/ReadOnlyProfileIcon';

export default function GlobalCommentCard({
                                              userName = 'User Name',
                                              userIconProps = {},
                                              commentText = 'This is a comment.',
                                          }) {
    const ICON_SIZE = 40;

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                gap: 1,
                color: '#fff',
                padding: 1,
                alignItems: 'flex-start',
            }}
        >
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
            </Box>
        </Box>
    );
}
