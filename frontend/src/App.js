import React from 'react';

// import ProtectedRoute from "./Components/ProtectedRoute";

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";

import Nav from './Components/Nav/nav';
import Footer from './Components/Footer/Footer';
import LandingPage from './Pages/LandingPage';
import Dashboard from './Pages/Dashboard';
import Register from './Pages/Register';
import Search from './Components/Search/Search';
import MovieDetails from './Pages/MovieDetails';
import AuthOverlayWrapper from "./componentsAC/SignInComponents/AuthOverlayWrapper";
import ProfileOverlayWrapper from "./componentsAC/ProfilePageComponents/ProfileOverlayWrapper";

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app-shell">
                    <Nav />
                    <div className="app-main">
                        <Routes>
                            <Route path="/landingpage" element={<LandingPage />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/moviedetails" element={<MovieDetails />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="*" element={<Navigate to="/landingpage" replace />} />
                        </Routes>
                    </div>
                    <Footer />

                    {/* Overlays */}
                    <AuthOverlayWrapper />
                    <ProfileOverlayWrapper />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
