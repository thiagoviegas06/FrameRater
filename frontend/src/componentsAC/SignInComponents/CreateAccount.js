import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOverlay } from "../../context/OverlayProvider";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import {
    Link,
    Box,
    Card,
    CardContent,
    TextField,
    Typography,
    Button,
} from "@mui/material";

export default function CreateAccountCard() {
    const navigate = useNavigate();
    const { setCreateAccountOverlayOpen, setLoginOverlayOpen } = useOverlay();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
    }

    setLoading(true);

    try {
        const userCred = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        // set display name in Firebase
        if (username) {
            await updateProfile(userCred.user, { displayName: username });
        }

        // after registration, go to login or straight to dashboard
        setCreateAccountOverlayOpen(false);
        setLoginOverlayOpen(true);
        } catch (err) {
            console.error(err);
            setError(err.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '48%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
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

                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <TextField
                            label="Email"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        {/* Username */}
                        <TextField
                            label="Username"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        {/* Password */}
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {/* Confirm Password */}
                        <TextField
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        {error && (
                            <Typography sx={{ color: "#ffb3b3", mt: 1 }}>
                                {error}
                            </Typography>
                        )}

                        {/* Join Button */}
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
                            {loading ? "Creating..." : "Join Now"}
                        </Button>
                    </form>

                    <Box sx={{ textAlign: "left", mt: 1 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: "11pt",
                                color: "rgba(255,255,255,0.85)",
                                fontFamily: '"Poppins", sans-serif',
                            }}
                        >
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                underline="hover"
                                sx={{
                                    color: "rgba(255,255,255,0.7)",
                                    fontWeight: 600,
                                    "&:hover": { color: 'rgba(255,255,255,0.9)' },
                                }}
                            >
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}