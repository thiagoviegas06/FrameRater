import React, { useState, useEffect } from "react";
import { useOverlay } from "../../context/OverlayProvider";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default function ProfileDropdown() {
    const [profileOpen, setProfileOpen] = useState(false);
    const [authUser, setAuthUser] = useState(null);
    const { setProfileOverlayOpen, setLoginOverlayOpen } = useOverlay();
    const auth = getAuth();

    // Track Firebase auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthUser(user);
        });
        return unsubscribe;
    }, [auth]);

    const handleLogout = async () => {
        await signOut(auth);
        setAuthUser(null);
    };

    return (
        <div
            className="nav-profile"
            onMouseEnter={() => setProfileOpen(true)}
            onMouseLeave={() => setProfileOpen(false)}
        >
            <svg fill="white" viewBox="0 0 24 24" width="24" height="24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>

            <div className={`nav-profile-menu ${profileOpen ? "open" : ""}`}>
                {/* Only show profile if logged in */}
                {authUser && (
                    <button
                        type="button"
                        className="nav-profile-item"
                        onClick={() => setProfileOverlayOpen(true)}
                    >
                        Profile
                    </button>
                )}

                {/* Login / Logout */}
                {authUser ? (
                    <button
                        type="button"
                        className="nav-profile-item nav-profile-logout"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        type="button"
                        className="nav-profile-item"
                        onClick={() => setLoginOverlayOpen(true)}
                    >
                        Login
                    </button>
                )}
            </div>
        </div>
    );
}
