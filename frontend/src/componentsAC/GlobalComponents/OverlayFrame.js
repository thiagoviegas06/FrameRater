// ./components/OverlayFrame.jsx
import React, { useEffect, useState } from 'react';
import { Box, Fade } from '@mui/material';

export default function OverlayFrame({ open, children }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(open);
    }, [open]);

    return (
        <Fade in={show} timeout={500} unmountOnExit>
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: `
                        radial-gradient(
                            circle at center,
                            rgba(255, 255, 255, 0.03) 0%,   /* very faint center glow */
                            rgba(25, 25, 25, 0.85) 50%,     /* dark middle */
                            rgba(0, 0, 0, .9) 100%           /* solid black edges */
                        )
                    `,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                    backdropFilter: 'blur(5px) brightness(0.8)',
                    transition: 'background 1s ease',
                }}
            >
                {children}
            </Box>
        </Fade>
    );
}
