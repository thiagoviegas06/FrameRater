import React from 'react';
import { Avatar, Box } from '@mui/material';

export default function ReadOnlyProfileIcon({ size = 80, image }) {
    return (
        <Box sx={{ display: 'inline-block' }}>
            <Avatar
                src={image}
                sx={{
                    width: size,
                    height: size,
                    fontSize: size / 2.5,
                }}
            >
                {!image && 'U'}
            </Avatar>
        </Box>
    );
}
