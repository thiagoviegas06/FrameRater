import React, { useState } from "react";
import { Box, Card, CardContent, TextField, Typography, Button } from "@mui/material";
import OverlayFrame from "../GlobalComponents/OverlayFrame";
import { useOverlay } from "../../context/OverlayProvider";

export default function PasswordResetEmailOverlay() {
    const {
        passwordResetOverlayOpen,
        setPasswordResetOverlayOpen,
        resetConfirmationOverlayOpen,
        setResetConfirmationOverlayOpen,
        setLoginOverlayOpen
    } = useOverlay();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReset = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 800));

            // Success: close current overlay, show confirmation overlay
            setPasswordResetOverlayOpen(false);
            setResetConfirmationOverlayOpen(true);
        } catch (err) {
            console.error(err);
            setError("Failed to send reset email. Try again.");
        } finally {
            setLoading(false);
        }
    };

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

    return (
        <OverlayFrame open={passwordResetOverlayOpen}>
            <Card sx={{ width: { xs: '90%', sm: 400 }, background: 'linear-gradient(135deg, #8b0000 0%, #000000 80%)', borderRadius: 3, boxShadow: '0 8px 20px rgba(0,0,0,0.5)' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="h5" sx={{ color: 'white', textAlign: 'center', fontWeight: 600, lineHeight: 1.2 }}>
                            Password Reset
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'white', textAlign: 'center', fontWeight: 400, lineHeight: 1.2 }}>
                            Enter the email associated with your account
                        </Typography>
                    </Box>

                    <form onSubmit={handleReset}>
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
                                '&:hover': { backgroundColor: '#a40000', boxShadow: '0 0 18px rgba(139,0,0,0.5)', transform: 'translateY(-1px)' },
                            }}
                        >
                            {loading ? "Sending..." : "Reset Password"}
                        </Button>
                    </form>

                    <Typography
                        sx={{ textAlign: 'center', mt: 2, fontSize: '11pt', color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }}
                        onClick={() => {
                            setPasswordResetOverlayOpen(false); // close password reset overlay
                            setLoginOverlayOpen(true); // open login overlay
                        }}
                    >
                        Back to Sign In
                    </Typography>
                </CardContent>
            </Card>
        </OverlayFrame>
    );
}
