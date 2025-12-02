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
                    background: 'rgba(0,0,0,0.8)', // semi-transparent backdrop
                    zIndex: 1000,
                    overflowY: 'auto',
                }}
            >
                <Box
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                        position: 'relative',
                        borderRadius: 3,
                        backdropFilter: 'blur(12px)',
                        bgcolor: 'rgba(20, 20, 20, 0.95)',
                        overflow: 'hidden',
                        boxShadow: '0 0 80px 6px rgba(255, 255, 255, 0.35)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: 500,   // FIXED width
                        height: 700,  // FIXED height
                    }}
                >
                    {children || (
                        <Box sx={{ width: '100%', height: '100%', bgcolor: 'blue', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <span style={{ color: 'white', fontWeight: 'bold' }}>TEST CONTENT</span>
                        </Box>
                    )}
                </Box>

            </Box>
        </Fade>
    );
}
