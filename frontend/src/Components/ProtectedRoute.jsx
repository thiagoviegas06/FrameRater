import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    // You can swap this for a spinner component
    return <div style={{ color: "white", padding: "2rem" }}>Checking auth...</div>;
  }

  if (!user) {
    // Not logged in → kick to login
    return <Navigate to="/login" replace />;
  }

  // Logged in → render the protected content
  return children;
}
