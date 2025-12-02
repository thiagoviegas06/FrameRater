import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOverlay } from '../../context/OverlayProvider';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { fetchWithAuth } from '../../api/client';
import { Card, CardContent, TextField, Typography, Button, Link, Box } from '@mui/material';

export default function CreateAccountCard() {
    const navigate = useNavigate();
    const { setCreateAccountOverlayOpen, setLoginOverlayOpen } = useOverlay();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            // 1️⃣ Create Firebase Auth user
            const userCred = await createUserWithEmailAndPassword(auth, email, password);

            // 2️⃣ Insert into your app_user table via backend API
            await fetchWithAuth('/users', {
                method: 'POST',
                body: JSON.stringify({
                    uid: userCred.user.uid,
                    email,
                    photo_url: userCred.user.photoURL || null,
                }),
                headers: { 'Content-Type': 'application/json' },
            });

            // 3️⃣ Close overlay, open login overlay
            setCreateAccountOverlayOpen(false);
            setLoginOverlayOpen(true);
        } catch (err) {
            setError(err.message || 'Registration failed');
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
        <Card
            sx={{
                width: { xs: '90%', sm: 400 },
                background: 'linear-gradient(135deg, #8b0000 0%, #000000 80%)',
                borderRadius: 3,
                boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
            }}
        >
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 4 }}>
                <Typography variant="h5" sx={{ color: 'white', textAlign: 'center', fontWeight: 600 }}>
                    Join Now
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField label="Email" fullWidth variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} sx={textFieldSx} />
                    <TextField label="Password" type="password" fullWidth variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} sx={textFieldSx} />
                    <TextField label="Confirm Password" type="password" fullWidth variant="outlined" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} sx={textFieldSx} />

                    {error && <Typography sx={{ color: '#ffb3b3', mt: 1 }}>{error}</Typography>}

                    <Button
                        fullWidth
                        type="submit"
                        disabled={loading}
                        variant="contained"
                        sx={{
                            mt: 2,
                            py: 1.2,
                            backgroundColor: '#8b0000',
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
                        {loading ? 'Creating...' : 'Join Now'}
                    </Button>
                </form>

                <Box sx={{ textAlign: 'left', mt: 1 }}>
                    <Typography variant="body2" sx={{ fontSize: '11pt', color: 'rgba(255,255,255,0.85)' }}>
                        Already have an account?{' '}
                        <Link
                            onClick={() => {
                                setCreateAccountOverlayOpen(false);
                                setLoginOverlayOpen(true);
                            }}
                            underline="hover"
                            sx={{
                                color: 'rgba(255,255,255,0.7)',
                                fontWeight: 600,
                                cursor: 'pointer',
                                '&:hover': { color: 'rgba(255,255,255,0.9)' },
                            }}
                        >
                            Sign in
                        </Link>
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
