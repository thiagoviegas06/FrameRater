// componentsAC/SignInComponents/AuthOverlayWrapper.jsx
import React from "react";
import { useOverlay } from "../../context/OverlayProvider";

import LoginCard from "./SignInCard";
import CreateAccountCard from "./CreateAccount";
import PasswordResetOverlay from "./PasswordReset";
import ResetConfirmationCard from "./ResetConfirmation";
import OverlayFrame from "../GlobalComponents/OverlayFrame";

export default function AuthOverlayWrapper() {
    const {
        loginOverlayOpen,
        setLoginOverlayOpen,
        createAccountOverlayOpen,
        setCreateAccountOverlayOpen,
        passwordResetOverlayOpen,
        setPasswordResetOverlayOpen,
        resetConfirmationOverlayOpen,
        setResetConfirmationOverlayOpen,
    } = useOverlay();

    return (
        <>
            {/* LOGIN */}
            <OverlayFrame
                open={loginOverlayOpen}
                onClose={() => setLoginOverlayOpen(false)}
            >
                <LoginCard
                    onClose={() => setLoginOverlayOpen(false)}
                    onSignUp={() => {
                        setLoginOverlayOpen(false);
                        setCreateAccountOverlayOpen(true);
                    }}
                    onForgotPassword={() => {
                        setLoginOverlayOpen(false);
                        setPasswordResetOverlayOpen(true);
                    }}
                />
            </OverlayFrame>

            {/* CREATE ACCOUNT */}
            <OverlayFrame
                open={createAccountOverlayOpen}
                onClose={() => setCreateAccountOverlayOpen(false)}
            >
                <CreateAccountCard
                    onClose={() => setCreateAccountOverlayOpen(false)}
                    onSignIn={() => {
                        setCreateAccountOverlayOpen(false);
                        setLoginOverlayOpen(true);
                    }}
                />
            </OverlayFrame>

            {/* PASSWORD RESET */}
            <OverlayFrame
                open={passwordResetOverlayOpen}
                onClose={() => setPasswordResetOverlayOpen(false)}
            >
                <PasswordResetOverlay
                    onClose={() => setPasswordResetOverlayOpen(false)}
                    onResetSent={() => {
                        setPasswordResetOverlayOpen(false);
                        setResetConfirmationOverlayOpen(true);
                    }}
                    onSignIn={() => {
                        setPasswordResetOverlayOpen(false);
                        setLoginOverlayOpen(true);
                    }}
                />
            </OverlayFrame>

            {/* RESET CONFIRMATION */}
            <OverlayFrame
                open={resetConfirmationOverlayOpen}
                onClose={() => setResetConfirmationOverlayOpen(false)}
            >
                <ResetConfirmationCard
                    onClose={() => setResetConfirmationOverlayOpen(false)}
                    onSignIn={() => {
                        setResetConfirmationOverlayOpen(false);
                        setLoginOverlayOpen(true);
                    }}
                />
            </OverlayFrame>
        </>
    );
}
