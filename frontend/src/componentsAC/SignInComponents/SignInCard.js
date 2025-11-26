import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // adjust path if needed
import {
  Link,
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
} from "@mui/material";

export default function SignInCard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Firebase sign-in
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      // Optional: get ID token here if you want
      // const token = await userCred.user.getIdToken();

      // go to dashboard after login
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
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
            Sign In
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

            {error && (
              <Typography
                variant="body2"
                sx={{ color: "#ffb3b3", mt: 1 }}
              >
                {error}
              </Typography>
            )}

            <Box sx={{ textAlign: "left", mt: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "11pt",
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                Forgot Password?{" "}
                <Link
                  href="/passwordreset"
                  underline="hover"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 600,
                    "&:hover": { color: 'rgba(255,255,255,0.9)' },
                  }}
                >
                  Reset
                </Link>
              </Typography>
            </Box>

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
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#a40000',
                  boxShadow: '0 0 18px rgba(139,0,0,0.5)',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
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
              Need an account?{" "}
              <Link
                href="/register"
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
