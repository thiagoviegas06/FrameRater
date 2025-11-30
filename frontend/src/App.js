import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./Components/ProtectedRoute";
import AuthOverlayWrapper from "./componentsAC/SignInComponents/AuthOverlayWrapper";
import ProfileOverlayWrapper from "./componentsAC/ProfilePageComponents/ProfileOverlayWrapper";
import Nav from './Components/Nav/nav';
import Footer from './Components/Footer/Footer';
import LandingPage from './Pages/LandingPage';
import Dashboard from './Pages/Dashboard';
// import Profile from './Pages/Profile';
import Register from './Pages/Register';
import ResetConfirmation from './componentsAC/SignInComponents/ResetConfirmation'
import PasswordReset from './componentsAC/SignInComponents/PasswordReset'
import Search from './Components/Search/Search';
//import SignUpConfirmation from './componentsAC/SignInComponents/SignUpConfirmation'
import MovieDetails from './Pages/MovieDetails'


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-shell">
          <Nav />

          {/* main content should expand to push footer down */}
          <main className="app-main">
            <Routes>
              <Route path="/landingpage" element={<LandingPage />} />
              <Route path="/resetconfirmation" element={<ResetConfirmation />} />
              <Route path="/passwordreset" element={<PasswordReset />} />
              <Route path="/search" element={<Search />} />

              {/* <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              /> */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/moviedetails" element={<MovieDetails />} />
              {/* <Route path="/profile" element={<Profile />} /> */}
              {/* <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              /> */}
              <Route path="/register" element={<Register />} />

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