import React, { useEffect, useState } from 'react';
import { Box, Fade } from '@mui/material';

export default function OverlayFrame({ open, onClose, children }) {
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
                    background: 'rgba(0,0,0,0.8)', // overlay opacity
                    zIndex: 1000,
                    overflowY: 'auto',
                }}
            >
                <Box
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                        position: 'relative',
                        width: { xs: '90%', sm: 400 },
                        maxHeight: '90vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        borderRadius: 3,
                        backdropFilter: 'blur(8px)',
                        bgcolor: 'rgba(20, 20, 20, 0.95)',
                        overflow: 'hidden',
                        // RED OUTER GLOW
                        boxShadow: '0 0 60px 3px rgba(255, 255, 255, 0.3)',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Fade>
    );
}
