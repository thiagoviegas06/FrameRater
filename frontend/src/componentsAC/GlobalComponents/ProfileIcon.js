import React, { useState } from 'react';
import { Avatar, IconButton, Box } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

export default function ProfileIcon({ size = 80, initialImage, onImageChange }) {
    const [image, setImage] = useState(initialImage || '');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target.result);
                if (onImageChange) onImageChange(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box sx={{ position: 'relative', display: 'inline-block' }}>
            {/* Avatar */}
            <Avatar
                src={image}
                sx={{
                    width: size,
                    height: size,
                    fontSize: size / 2.5,
                }}
            >
                { !image && 'U' }
            </Avatar>

            {/* Edit button */}
            <IconButton
                component="label"
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    bgcolor: 'rgba(0,0,0,0.6)',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
                    width: size / 3,
                    height: size / 3,
                    padding: 0,
                }}
            >
                <CameraAltIcon sx={{ color: 'white', fontSize: size / 5 }} />
                <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </IconButton>
        </Box>
    );
}
