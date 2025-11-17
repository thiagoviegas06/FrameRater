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

export default function CreateAccountCard() {
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
                    <Typography
                        variant="h5"
                        sx={{
                            color: 'white',
                            textAlign: 'center',
                            fontWeight: 600,
                            mb: 1,
                        }}
                    >
                        Join Now
                    </Typography>

                    {/* Email */}
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        slotProps={{
                            input: {
                                sx: {
                                    color: 'white',
                                    backgroundColor: 'rgba(255,255,255,0.4)',
                                    borderRadius: 2,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,.5)',
                                    },
                                },
                            },
                            inputLabel: {
                                sx: { color: 'rgba(255,255,255,0.8)' },
                            },
                        }}
                    />


                    {/* Username */}
                    <TextField
                        label="Username"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        slotProps={{
                            input: {
                                sx: {
                                    color: 'white',
                                    backgroundColor: 'rgba(255,255,255,0.4)',
                                    borderRadius: 2,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,.5)',
                                    },
                                },
                            },
                            inputLabel: {
                                sx: { color: 'rgba(255,255,255,0.8)' },
                            },
                        }}
                    />

                    {/* Password */}
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        slotProps={{
                            input: {
                                sx: {
                                    color: 'white',
                                    backgroundColor: 'rgba(255,255,255,0.4)',
                                    borderRadius: 2,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,.5)',
                                    },
                                },
                            },
                            inputLabel: {
                                sx: { color: 'rgba(255,255,255,0.8)' },
                            },
                        }}
                    />

                    {/* Confirm Password */}
                    <TextField
                        label="Confirm Password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        slotProps={{
                            input: {
                                sx: {
                                    color: 'white',
                                    backgroundColor: 'rgba(255,255,255,0.4)',
                                    borderRadius: 2,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,.5)',
                                    },
                                },
                            },
                            inputLabel: {
                                sx: { color: 'rgba(255,255,255,0.8)' },
                            },
                        }}
                    />
                    <Box sx={{ textAlign: "left", mt: 1 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: "11pt",
                                color: "rgba(255,255,255,0.85)",
                                fontFamily: '"Poppins", sans-serif',
                            }}
                        >
                            By clicking join now, you agree to our {" "}
                            <Link
                                href="/signin"
                                underline="hover"
                                sx={{
                                    color: "rgba(255,255,255,0.7)",
                                    fontWeight: 600,
                                    "&:hover": { color: 'rgba(255,255,255,0.9)' },
                                }}
                            >
                                Terms of Service
                            </Link>
                        </Typography>
                    </Box>

                    {/* Deep Crimson Sign In Button */}
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 2,
                            py: 1.2,
                            backgroundColor: '#8b0000', // deep crimson
                            color: 'white',
                            fontWeight: 600,
                            textTransform: 'none',
                            borderRadius: 2,
                            boxShadow: '0 0 12px rgba(139,0,0,0.3)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: '#a40000',
                                boxShadow: '0 0 18px rgba(139,0,0,0.5)',
                                transform: 'translateY(-1px)',
                            },
                        }}
                    >
                        Join Now
                    </Button>

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
                                Sign up
                            </Link>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
