import React from 'react';
import { Box } from '@mui/material';

export default function FilmDetailBanner({ image, height = 240 }) {
    return (
        <Box
            sx={{
                width: '100%',
                height: height,
                backgroundColor: '#222', // fallback
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 2,
            }}
        >
            {image && (
                <img
                    src={image}
                    alt="Film Banner"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover', // maintain aspect ratio while filling box
                        display: 'block',
                    }}
                />
            )}
        </Box>
    );
}

