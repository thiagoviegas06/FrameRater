import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import OverlayFrameXL from "../GlobalComponents/OverlayFrameXL";
import ProfileOverlay from "./ProfileOverlay";
import { useOverlay } from "../../context/OverlayProvider";
import { useAuth } from "../../context/AuthContext";
// CORRECTED IMPORT PATH AND FUNCTION NAME
import { fetchWithAuth } from "../../api/client";

export default function ProfileOverlayWrapper() {
    const { profileOverlayOpen, setProfileOverlayOpen } = useOverlay();
    const { user, loading: authLoading } = useAuth();

    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleClose = () => setProfileOverlayOpen(false);

    useEffect(() => {
        // Exit early if condition is not met or user is not available
        if (!profileOverlayOpen || authLoading || !user) {
            setProfileData(null);
            setLoading(false);
            return;
        }

        const fetchProfileData = async () => {
            setLoading(true);
            setError(null);

            try {
                if (user && user.getIdToken) {
                    const tempToken = await user.getIdToken();
                    console.log("FRESH FIREBASE ID TOKEN:", tempToken); // <--- COPY THIS TOKEN
                }
                // -----------------------------------

                // Original API calls:
                const [meResponse, reviewsResponse] = await Promise.all([
                    fetchWithAuth(`/api/me`),
                    fetchWithAuth(`/api/me/reviews`),
                ]);

                // Map and combine the fetched data
                setProfileData({
                    username: meResponse.display_name || 'N/A',
                    profileSummary: meResponse.bio || 'No summary provided.',
                    profileImage: meResponse.photo_url || 'https://via.placeholder.com/150',

                    comments: reviewsResponse.map(c => ({
                        movieTitle: c.movie_title || c.tv_title,
                        commentText: c.comment_text,
                    })) || [],
                });
            } catch (err) {
                console.error("Error fetching profile data:", err);
                setError(err.message || "Failed to load profile. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();

    }, [profileOverlayOpen, authLoading, user]);

    // --- Conditional Content Rendering ---
    let content;

    if (loading || authLoading) {
        content = (
            <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <CircularProgress color="secondary" />
                <Typography sx={{ mt: 2, color: 'silver' }}>Loading Profile...</Typography>
            </Box>
        );
    } else if (error) {
        content = (
            <Box sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    } else if (!user) {
        content = (
            <Box sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ color: 'silver' }}>You must be logged in to view your profile.</Typography>
            </Box>
        );
    } else if (profileData) {
        content = (
            <ProfileOverlay
                username={profileData.username}
                profileSummary={profileData.profileSummary}
                profileImage={profileData.profileImage}
                comments={profileData.comments}
                onClose={handleClose}
            />
        );
    }

    // --- Final Render ---
    return (
        <OverlayFrameXL open={profileOverlayOpen} onClose={handleClose}>
            {content}
        </OverlayFrameXL>
    );
}