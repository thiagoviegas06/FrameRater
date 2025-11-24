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

    const stopPropagation = (e) => e.stopPropagation();

    return (
        <Fade in={show} timeout={500} unmountOnExit>
            <Box
                onClick={handleOuterClick} // Close overlay when clicking outside inner box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: `
                        radial-gradient(
                            circle at center,
                            rgba(255, 255, 255, 0.03) 0%,
                            rgba(25, 25, 25, 0.5) 30%,
                            rgba(0, 0, 0, 0.9) 100%
                        )
                    `,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center', // vertically center
                    zIndex: 1000,
                    overflowY: 'auto',
                    backdropFilter: 'blur(5px) brightness(0.8)',
                    transition: 'background 1s ease',
                }}
            >
                <Box
                    onClick={stopPropagation} // Prevent clicks inside box from closing
                    sx={{ width: '100%', display: 'flex', justifyContent: 'center', maxHeight: '100vh', overflowY: 'auto' }}
                >
                    {children}
                </Box>
            </Box>
        </Fade>
    );
}

