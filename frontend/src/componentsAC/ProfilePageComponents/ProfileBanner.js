import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

export default function ProfileBanner({ initialImage, onImageChange, height = 120 }) {
    const [image, setImage] = useState(initialImage || null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            setImage(ev.target.result);
            if (onImageChange) onImageChange(ev.target.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <Box
            sx={{
                width: '100%',
                height,
                position: 'relative',
                bgcolor: '#000',
                background: !image
                    ? 'linear-gradient(135deg, #8b0000 0%, #000000 80%)'
                    : undefined,
                overflow: 'hidden',
            }}
        >
            {/* Banner Image */}
            {image && (
                <Box
                    component="img"
                    src={image}
                    alt="Banner"
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                    }}
                />
            )}

            {/* Camera Icon */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    zIndex: 20,
                }}
            >
                <IconButton component="label" sx={{ bgcolor: 'rgba(0,0,0,0.6)', p: 0.5, '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' } }}>
                    <CameraAltIcon sx={{ color: 'white', fontSize: 18 }} />
                    <input type="file" accept="image/*" hidden onChange={handleFileChange} />
                </IconButton>
            </Box>
        </Box>
    );
}
