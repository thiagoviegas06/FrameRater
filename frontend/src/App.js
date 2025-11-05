import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './Components/Nav/nav';
import LandingPage from './Pages/landingpage';

function App() {

  // Login logic need to go here
  return (
    <Router>
        <Nav />
      <Routes>
        {/* Nav */}

        {/* Default route - Landing page if not logged in */}
        {/* <Route
          path="/"
          element={!LoggedIn ? <LandingPage /> : <LoginForm />}
        /> */}

        {/* Register
        <Route path="/register" element={<Register />} />

        {/* Landing Page */}
        <Route path="/landingpage" element={<LandingPage />} />


        {/* Protected route - for personal information: profile etc. */}

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;