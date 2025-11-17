import React from 'react';
import {
    Link,
    Box,
    Card,
    CardContent,
    TextField,
    Typography,
    Button,
} from '@mui/material';

export default function PasswordReset() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(6px)',
            }}
        >
            <Card
                sx={{
                    width: { xs: '90%', sm: 400 },
                    background: 'linear-gradient(135deg, #8b0000 0%, #000000 80%)',
                    borderRadius: 3,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
                }}
            >
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        p: 4,
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                color: 'white',
                                textAlign: 'center',
                                fontWeight: 600,
                                mb: 0,
                                lineHeight: 1.2,
                            }}
                        >
                            Hey, Cool Kid <br /> Welcome to the Club
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                color: 'white',
                                textAlign: 'center',
                                fontWeight: 400,
                                mt: 0,
                                lineHeight: 1.2,
                            }}
                        >
                            Let's 
                        </Typography>
                    </Box>


                    <Box sx={{ textAlign: "left", mt: 1 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: "11pt",
                                color: "rgba(255,255,255,0.85)",
                                fontFamily: '"Poppins", sans-serif',
                            }}
                        >
                            Need an account?{" "}
                            <Link
                                href="/signin"
                                underline="hover"
                                sx={{
                                    color: "rgba(255,255,255,0.7)",
                                    fontWeight: 600,
                                    "&:hover": { color: 'rgba(255,255,255,0.9)' },
                                }}
                            >
                                View My Dashboard
                            </Link>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}