import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./Components/ProtectedRoute";

import Nav from './Components/Nav/nav';
import Footer from './Components/Footer/Footer';
import LandingPage from './Pages/LandingPage';
import Dashboard from './Pages/Dashboard';
import Register from './Pages/Register';
import Login from './Pages/Login';
import ResetConfirmation from './componentsAC/SignInComponents/ResetConfirmation';
import PasswordReset from './componentsAC/SignInComponents/PasswordReset';
import Search from './Components/Search/Search';
import MovieDetails from './Pages/MovieDetails';

import OverlayFrame from './componentsAC/GlobalComponents/OverlayFrame';
import ProfileOverlay from './componentsAC/ProfilePageComponents/ProfileOverlay';
import { useOverlay } from './context/OverlayProvider';

function App() {
    const { profileOverlayOpen, setProfileOverlayOpen } = useOverlay();

    return (
        // <AuthProvider>
        <Router>
            <div className="app-shell">
                {/* Pass click handler to trigger overlay */}
                <Nav onProfileClick={() => setProfileOverlayOpen(true)} />

                {/* Main content */}
                <div className="app-main">
                    <Routes>
                        <Route path="/landingpage" element={<LandingPage />} />
                        <Route path="/resetconfirmation" element={<ResetConfirmation />} />
                        <Route path="/passwordreset" element={<PasswordReset />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/moviedetails" element={<MovieDetails />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />

                        <Route path="*" element={<Navigate to="/landingpage" replace />} />
                    </Routes>
                </div>

                <Footer />

                {/* Overlay rendered above everything */}
                {profileOverlayOpen && (
                    <OverlayFrame open={profileOverlayOpen}>
                        <ProfileOverlay
                            username="JohnDoe"
                            profileSummary="This is my profile summary."
                            profileImage="https://via.placeholder.com/100"
                            comments={[]}
                            onClose={() => setProfileOverlayOpen(false)}
                        />
                    </OverlayFrame>
                )}
            </div>
        </Router>
        // </AuthProvider>
    );
}

export default App;

