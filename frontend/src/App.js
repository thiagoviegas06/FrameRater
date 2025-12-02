import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import AuthOverlayWrapper from "./componentsAC/SignInComponents/AuthOverlayWrapper";
import ProfileOverlayWrapper from "./componentsAC/ProfilePageComponents/ProfileOverlayWrapper";
import Nav from './Components/Nav/nav';
import Footer from './Components/Footer/Footer';
import LandingPage from './Pages/LandingPage';
import Dashboard from './Pages/Dashboard';
import Register from './Pages/Register';
import ResetConfirmation from './componentsAC/SignInComponents/ResetConfirmation';
import PasswordReset from './componentsAC/SignInComponents/PasswordReset';
import Search from './Components/Search/Search';
import MovieDetails from './Pages/MovieDetails';
import MoviesPage from './Pages/Movies';
import ShowsPage from './Pages/Shows';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app-shell">
                    <Nav />

                    {/* Main content should expand to push footer down */}
                    <main className="app-main">
                        <Routes>
                            <Route path="/landingpage" element={<LandingPage />} />
                            <Route path="/resetconfirmation" element={<ResetConfirmation />} />
                            <Route path="/passwordreset" element={<PasswordReset />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/movies" element={<MoviesPage />} /> {/* Movies page */}

                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/moviedetails" element={<MovieDetails />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/shows" element={<ShowsPage />} />


                            {/* Catch-all redirect */}
                            <Route path="*" element={<Navigate to="/landingpage" replace />} />
                        </Routes>
                    </main>

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
