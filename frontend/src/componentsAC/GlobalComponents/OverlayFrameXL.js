import React, { useEffect, useState } from 'react';
import { Box, Fade } from '@mui/material';

export default function OverlayFrameXL({ open, onClose, children }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(open);
    }, [open]);

    const handleOuterClick = () => {
        if (onClose) onClose();
    };

    return (
        <Fade in={show} timeout={500} unmountOnExit>
            <Box
                onClick={handleOuterClick}
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'rgba(0,0,0,0.8)', // semi-transparent background
                    zIndex: 1000,
                    overflowY: 'auto',
                }}
            >
                <Box
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                        position: 'relative',
                        width: { xs: '95%', sm: '90%', md: '80%', lg: 700 }, // larger width
                        maxHeight: '95vh', // allow bigger overlay
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        borderRadius: 3,
                        backdropFilter: 'blur(12px)', // stronger blur
                        bgcolor: 'rgba(20, 20, 20, 0.95)',
                        overflow: 'hidden',
                        // WHITE OUTER GLOW
                        boxShadow: '0 0 80px 6px rgba(255, 255, 255, 0.35)',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Fade>
    );
}
