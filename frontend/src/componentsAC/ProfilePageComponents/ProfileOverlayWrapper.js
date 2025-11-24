import React, { useEffect, useState } from "react";
import OverlayFrame from "../GlobalComponents/OverlayFrame";
import ProfileOverlay from "./ProfileOverlay";
import { useOverlay } from "../../context/OverlayProvider";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function ProfileOverlayWrapper() {
    const { profileOverlayOpen, setProfileOverlayOpen } = useOverlay();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!profileOverlayOpen) return;

        const fetchProfile = async () => {
            setLoading(true);
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                try {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setProfileData(docSnap.data());
                    } else {
                        setProfileData({
                            username: user.displayName || "Demo User",
                            profileSummary: "This is a dummy profile summary.",
                            profileImage: "https://via.placeholder.com/150",
                            comments: [],
                        });
                    }
                } catch (err) {
                    console.error("Error fetching profile:", err);
                    setProfileData({
                        username: "Demo User",
                        profileSummary: "Error fetching profile. Showing dummy data.",
                        profileImage: "https://via.placeholder.com/150",
                        comments: [],
                    });
                }
            } else {
                setProfileData({
                    username: "Demo User",
                    profileSummary: "No user logged in. Showing dummy profile.",
                    profileImage: "https://via.placeholder.com/150",
                    comments: [],
                });
            }

            setLoading(false);
        };

        fetchProfile();
    }, [profileOverlayOpen]);

    return (
        <OverlayFrame
            open={profileOverlayOpen}
            onClose={() => setProfileOverlayOpen(false)}
        >
            {loading && (
                <div style={{ color: "white", textAlign: "center", padding: "2rem" }}>
                    Loading profile...
                </div>
            )}

            {!loading && profileData && (
                <ProfileOverlay
                    username={profileData.username}
                    profileSummary={profileData.profileSummary}
                    profileImage={profileData.profileImage}
                    comments={profileData.comments || []}
                    onClose={() => setProfileOverlayOpen(false)}
                />
            )}

            {/* Fallback: show something even if profileData is null */}
            {!loading && !profileData && (
                <div
                    style={{
                        color: "white",
                        background: "#333",
                        padding: "2rem",
                        borderRadius: "8px",
                        textAlign: "center",
                    }}
                >
                    No profile data. This is a placeholder.
                    <button
                        onClick={() => setProfileOverlayOpen(false)}
                        style={{ marginTop: "1rem" }}
                    >
                        Close
                    </button>
                </div>
            )}
        </OverlayFrame>
    );
}
