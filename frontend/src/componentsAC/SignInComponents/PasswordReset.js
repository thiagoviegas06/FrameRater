import React, { useState } from "react";
import { Box, Card, CardContent, TextField, Typography, Button } from "@mui/material";
import OverlayFrame from "../GlobalComponents/OverlayFrame";
import { useOverlay } from "../../context/OverlayProvider";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function PasswordResetFlow({ useFirebase = true }) {
    const { passwordResetOverlayOpen, setPasswordResetOverlayOpen, setLoginOverlayOpen } = useOverlay();
    const [step, setStep] = useState(1); // 1 = email, 2 = confirmation
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const textFieldSx = {
        '& .MuiOutlinedInput-root': {
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 700,
            fontSize: '0.875rem',
            boxShadow: 'inset 0 0 6px rgba(255,255,255,0.2)',
            '& fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
            '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.8)', borderWidth: 2 },
            '&.Mui-focused fieldset': { borderColor: 'rgba(255,255,255,1)', borderWidth: 2 },
        },
        '& input': { color: 'rgba(255,255,255,0.9)', fontWeight: 700, fontSize: '0.875rem' },
        '& label': { color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' },
        mb: 2,
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!email) {
            setError("Please enter your email");
            setLoading(false);
            return;
        }

        try {
            if (useFirebase) {
                const auth = getAuth();
                await sendPasswordResetEmail(auth, email);
            } else {
                // Simulate sending reset email
                await new Promise((resolve) => setTimeout(resolve, 800));
            }
            setStep(2); // move to confirmation step
        } catch (err) {
            console.error(err);
            setError("Failed to send reset email. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setPasswordResetOverlayOpen(false);
        setStep(1); // reset flow
    };

    return (
        <OverlayFrame open={passwordResetOverlayOpen} onClose={handleClose}>
            <Card sx={{ width: { xs: '90%', sm: 400 }, background: 'linear-gradient(135deg, #8b0000 0%, #000000 80%)', borderRadius: 3, boxShadow: '0 8px 20px rgba(0,0,0,0.5)' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 4, alignItems: 'center' }}>

                    {step === 1 && (
                        <>
                            <Typography variant="h5" sx={{ color: 'white', textAlign: 'center', fontWeight: 600 }}>
                                Password Reset
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'white', textAlign: 'center', mb: 2 }}>
                                Enter the email associated with your account
                            </Typography>

                            <form onSubmit={handleEmailSubmit} style={{ width: '100%' }}>
                                <TextField
                                    label="Email"
                                    fullWidth
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    sx={textFieldSx}
                                />
                                {error && <Typography sx={{ color: "#ffb3b3", mt: 1, textAlign: 'center' }}>{error}</Typography>}

                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    disabled={loading}
                                    sx={{
                                        mt: 2,
                                        py: 1.2,
                                        backgroundColor: '#8b0000',
                                        color: 'white',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        borderRadius: 2,
                                        boxShadow: '0 0 12px rgba(139,0,0,0.3)',
                                        '&:hover': { backgroundColor: '#a40000', boxShadow: '0 0 18px rgba(139,0,0,0.5)' },
                                    }}
                                >
                                    {loading ? "Sending..." : "Send Reset Email"}
                                </Button>
                            </form>
                        </>
                    )}

                    {step === 2 && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 250, textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                                Check Your Email for a Password Reset Link
                            </Typography>
                            <Button
                                onClick={() => {
                                    setPasswordResetOverlayOpen(false);
                                    setLoginOverlayOpen(true);
                                    setStep(1);
                                }}
                                variant="contained"
                                sx={{
                                    mt: 2,
                                    py: 1,
                                    backgroundColor: '#8b0000',
                                    color: 'white',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    borderRadius: 2,
                                    '&:hover': { backgroundColor: '#a40000' },
                                }}
                            >
                                Sign In
                            </Button>
                        </Box>
                    )}

                    {step !== 2 && (
                        <Typography
                            sx={{ textAlign: 'center', mt: 2, fontSize: '11pt', color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }}
                            onClick={() => {
                                setPasswordResetOverlayOpen(false);
                                setLoginOverlayOpen(true);
                                setStep(1);
                            }}
                        >
                            Back to Sign In
                        </Typography>
                    )}

                </CardContent>
            </Card>
        </OverlayFrame>
    );
}
