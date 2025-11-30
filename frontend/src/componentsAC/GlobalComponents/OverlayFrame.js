// componentsAC/GlobalComponents/OverlayFrame.jsx
import React, { useEffect, useState } from 'react';
import { Box, Fade, Button } from '@mui/material';

export default function OverlayFrame({ open, onClose, children, showCloseButton = true }) {
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
                    background: 'rgba(0,0,0,0.6)',
                    zIndex: 1000,
                    overflowY: 'auto',
                }}
            >
                <Box
                    onClick={(e) => e.stopPropagation()} // stop clicks inside from closing
                    sx={{
                        position: 'relative', // relative container for X
                        width: { xs: '90%', sm: 400 },
                        maxHeight: '90vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    {/* X Button inside card (conditionally rendered) */}
                    {showCloseButton && (
                        <Button
                            onClick={onClose}
                            sx={{
                                position: 'absolute',
                                top: 1,      // vertical padding from top
                                right: 12,  // horizontal padding from right
                                minWidth: 0,
                                padding: '4px', // extra padding around the X for easier clicking
                                color: 'white',
                                fontSize: '1.75rem', // slightly larger X
                                zIndex: 10,
                            }}
                        >
                            ×
                        </Button>
                    )}

                    {children}
                </Box>
            </Box>
        </Fade>
    );
}
