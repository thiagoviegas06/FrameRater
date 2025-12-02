import React, { createContext, useContext, useState } from "react";

const OverlayContext = createContext();

export const useOverlay = () => useContext(OverlayContext);

export const OverlayProvider = ({ children }) => {
    const [loginOverlayOpen, setLoginOverlayOpen] = useState(false);
    const [createAccountOverlayOpen, setCreateAccountOverlayOpen] = useState(false);
    const [passwordResetOverlayOpen, setPasswordResetOverlayOpen] = useState(false);
    const [resetConfirmationOverlayOpen, setResetConfirmationOverlayOpen] = useState(false);
    const [profileOverlayOpen, setProfileOverlayOpen] = useState(false);

    return (
        <OverlayContext.Provider
            value={{
                loginOverlayOpen,
                setLoginOverlayOpen,
                createAccountOverlayOpen,
                setCreateAccountOverlayOpen,
                passwordResetOverlayOpen,
                setPasswordResetOverlayOpen,
                resetConfirmationOverlayOpen,
                setResetConfirmationOverlayOpen,
                profileOverlayOpen,
                setProfileOverlayOpen,
            }}
        >
            {children}
        </OverlayContext.Provider>
    );
};
