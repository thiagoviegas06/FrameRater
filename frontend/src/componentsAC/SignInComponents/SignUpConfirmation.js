import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // adjust path if needed
import { Box, Card, CardContent, TextField, Typography, Button } from "@mui/material";
import OverlayFrame from "../GlobalComponents/OverlayFrame"; // make sure path is correct
import { useOverlay } from "../../context/OverlayProvider";

export default function SignInOverlay() {
    const { signInOverlayOpen, setSignInOverlayOpen, setRegisterOverlayOpen, setPasswordResetOverlayOpen } = useOverlay();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setSignInOverlayOpen(false); // close overlay on success
        } catch (err) {
            console.error(err);
            setError(err.message || "Login failed");
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
        <OverlayFrame open={signInOverlayOpen}>
            <Card sx={{ width: { xs: '90%', sm: 400 }, background: 'linear-gradient(135deg, #8b0000 0%, #000000 80%)', borderRadius: 3, boxShadow: '0 8px 20px rgba(0,0,0,0.5)' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 4 }}>
                    <Typography variant="h5" sx={{ color: 'white', textAlign: 'center', fontWeight: 600, mb: 1, lineHeight: 1.2 }}>
                        Sign In
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <TextField label="Email" fullWidth variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} sx={textFieldSx} />
                        <TextField label="Password" type="password" fullWidth variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} sx={textFieldSx} />

                        {error && <Typography variant="body2" sx={{ color: "#ffb3b3", mt: 1 }}>{error}</Typography>}

                        <Button fullWidth type="submit" variant="contained" disabled={loading} sx={{
                            mt: 2, py: 1.2, backgroundColor: '#8b0000', color: 'white', fontWeight: 600,
                            textTransform: 'none', borderRadius: 2, boxShadow: '0 0 12px rgba(139,0,0,0.3)',
                            transition: 'all 0.3s ease',
                            '&:hover': { backgroundColor: '#a40000', boxShadow: '0 0 18px rgba(139,0,0,0.5)', transform: 'translateY(-1px)' },
                        }}>
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>

                    <Typography sx={{ textAlign: 'center', mt: 2, fontSize: '11pt', color: 'rgba(255,255,255,0.85)', fontFamily: '"Poppins", sans-serif' }}>
                        Need an account?{" "}
                        <span onClick={() => { setSignInOverlayOpen(false); setRegisterOverlayOpen(true); }} style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, cursor: 'pointer' }}>Sign up</span>
                    </Typography>

                    <Typography sx={{ textAlign: 'center', mt: 1, fontSize: '11pt', color: 'rgba(255,255,255,0.85)', fontFamily: '"Poppins", sans-serif' }}>
                        Forgot password?{" "}
                        <span onClick={() => { setSignInOverlayOpen(false); setPasswordResetOverlayOpen(true); }} style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, cursor: 'pointer' }}>Reset</span>
                    </Typography>
                </CardContent>
            </Card>
        </OverlayFrame>
    );
}
