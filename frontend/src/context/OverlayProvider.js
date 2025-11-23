import React, { createContext, useContext, useState } from 'react';

// Create context just for OverlayFrame-based overlays
const OverlayContext = createContext();

export function OverlayProvider({ children }) {
    // Add overlay states here for any OverlayFrame modal
    const [profileOverlayOpen, setProfileOverlayOpen] = useState(false);
    const [settingsOverlayOpen, setSettingsOverlayOpen] = useState(false);
    // You can add more as needed

    return (
        <OverlayContext.Provider
            value={{
                profileOverlayOpen,
                setProfileOverlayOpen,
                settingsOverlayOpen,
                setSettingsOverlayOpen,
            }}
        >
            {children}
        </OverlayContext.Provider>
    );
}

// Hook to use overlay state
export function useOverlay() {
    return useContext(OverlayContext);
}
