import React, { useState } from "react";
import { Box, Card, CardContent, TextField, Typography, Button } from "@mui/material";
import OverlayFrame from "../GlobalComponents/OverlayFrame"; // adjust path
import { useOverlay } from "../../context/OverlayProvider";

// Optional: Firebase import if needed
// import { getAuth, confirmPasswordReset } from "firebase/auth";

export default function PasswordResetOverlay({ useFirebase = false }) {
    const { passwordResetOverlayOpen, setPasswordResetOverlayOpen, setSignInOverlayOpen } = useOverlay();

    const [resetCode, setResetCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            if (useFirebase) {
                // const auth = getAuth();
                // await confirmPasswordReset(auth, resetCode, newPassword);
            }
            setSuccess("Password reset successfully! You can now sign in.");
            // Close overlay and open sign-in
            setTimeout(() => {
                setPasswordResetOverlayOpen(false);
                setSignInOverlayOpen(true);
            }, 1500);
        } catch (err) {
            console.error(err);
            setError(err?.message || "Failed to reset password");
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
                            Check Your Email
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'white', textAlign: 'center', fontWeight: 400, lineHeight: 1.2 }}>
                            Enter the password reset code and your new password
                        </Typography>
                    </Box>

                    <form onSubmit={handleSubmit}>
                        <TextField label="Reset Code" fullWidth variant="outlined" value={resetCode} onChange={(e) => setResetCode(e.target.value)} sx={textFieldSx} />
                        <TextField label="New Password" type="password" fullWidth variant="outlined" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} sx={textFieldSx} />
                        <TextField label="Confirm New Password" type="password" fullWidth variant="outlined" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} sx={textFieldSx} />

                        {error && <Typography sx={{ color: "#ffb3b3", mt: 1, textAlign: 'center' }}>{error}</Typography>}
                        {success && <Typography sx={{ color: "#b3ffb3", mt: 1, textAlign: 'center' }}>{success}</Typography>}

                        <Button fullWidth type="submit" variant="contained" disabled={loading} sx={{
                            mt: 2, py: 1.2, backgroundColor: '#8b0000', color: 'white', fontWeight: 600,
                            textTransform: 'none', borderRadius: 2, boxShadow: '0 0 12px rgba(139,0,0,0.3)',
                            transition: 'all 0.3s ease',
                            '&:hover': { backgroundColor: '#a40000', boxShadow: '0 0 18px rgba(139,0,0,0.5)', transform: 'translateY(-1px)' },
                        }}>
                            {loading ? "Resetting..." : "Reset Password"}
                        </Button>
                    </form>

                    <Typography sx={{ textAlign: 'center', mt: 2, fontSize: '11pt', color: 'rgba(255,255,255,0.85)', fontFamily: '"Poppins", sans-serif' }}>
                        Need an account?{" "}
                        <span onClick={() => { setPasswordResetOverlayOpen(false); setSignInOverlayOpen(true); }} style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, cursor: 'pointer' }}>
                            Sign in
                        </span>
                    </Typography>
                </CardContent>
            </Card>
        </OverlayFrame>
    );
}
