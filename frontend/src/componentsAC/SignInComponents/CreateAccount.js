import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, TextField, Typography, Button } from "@mui/material";
import { useOverlay } from "../../context/OverlayProvider";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";

export default function CreateAccountCard({ autoSignIn = false }) {
    const { createAccountOverlayOpen, setCreateAccountOverlayOpen, setLoginOverlayOpen } = useOverlay();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!email || !username || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Set display name
            await updateProfile(userCredential.user, { displayName: username });

            setSuccess("Account created successfully!");

            if (autoSignIn) {
                // Automatically sign in and redirect to dashboard
                await signInWithEmailAndPassword(auth, email, password);
                setCreateAccountOverlayOpen(false);
                navigate("/dashboard");
            } else {
                // Close this overlay and open login overlay
                setTimeout(() => {
                    setCreateAccountOverlayOpen(false);
                    setLoginOverlayOpen(true);
                }, 1500);
            }
        } catch (err) {
            console.error("Signup error:", err);
            setError(err?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    const textFieldStyles = {
        '& .MuiOutlinedInput-root': {
            '& input': { color: 'white', fontWeight: 700 },
            '& fieldset': { borderColor: 'white' },
            '&:hover fieldset': { borderColor: 'white', borderWidth: 2 },
            '&.Mui-focused fieldset': { borderColor: 'white', borderWidth: 2 },
        },
        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.8)' },
        mb: 2,
    };

    return (
        <Card sx={{
            width: { xs: "90%", sm: 400 },
            background: "linear-gradient(135deg, #8b0000 0%, #000000 80%)",
            borderRadius: 3,
            boxShadow: "0 8px 20px rgba(0,0,0,0.5)"
        }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2, p: 4 }}>
                <Typography variant="h5" sx={{ color: "white", textAlign: "center", fontWeight: 600, mb: 1 }}>
                    Join Now
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField label="Email" fullWidth variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} sx={textFieldStyles} />
                    <TextField label="Username" fullWidth variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} sx={textFieldStyles} />
                    <TextField label="Password" type="password" fullWidth variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} sx={textFieldStyles} />
                    <TextField label="Confirm Password" type="password" fullWidth variant="outlined" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} sx={textFieldStyles} />

                    {error && <Typography sx={{ color: "#ffb3b3", mt: 1, textAlign: "center" }}>{error}</Typography>}
                    {success && <Typography sx={{ color: "#b3ffb3", mt: 1, textAlign: "center" }}>{success}</Typography>}

                    <Button
                        fullWidth
                        type="submit"
                        disabled={loading}
                        variant="contained"
                        sx={{
                            mt: 2,
                            py: 1.2,
                            backgroundColor: "#8b0000",
                            color: "white",
                            fontWeight: 600,
                            textTransform: "none",
                            borderRadius: 2,
                            boxShadow: "0 0 12px rgba(139,0,0,0.3)",
                            '&:hover': { backgroundColor: "#a40000", boxShadow: "0 0 18px rgba(139,0,0,0.5)", transform: "translateY(-1px)" },
                        }}
                    >
                        {loading ? "Creating..." : "Join Now"}
                    </Button>
                </form>

                <Box sx={{ textAlign: "center", mt: 1 }}>
                    <Typography variant="body2" sx={{ fontSize: "11pt", color: "rgba(255,255,255,0.85)" }}>
                        Already have an account?{" "}
                        <span
                            onClick={() => { setCreateAccountOverlayOpen(false); setLoginOverlayOpen(true); }}
                            style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600, cursor: "pointer" }}
                        >
                            Sign in
                        </span>
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
