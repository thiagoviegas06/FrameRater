import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../api/client";
import Conversations from "../Components/Dashboard/Conversations";
import Recommendations from "../Components/Dashboard/Recommendations";
import NewReleases from "../Components/Dashboard/NewReleases";
import TrendingNow from "../Components/Dashboard/TrendingNow";
import YourLists from "../Components/Dashboard/YourLists";
import CommunityLists from "../Components/Dashboard/CommunityLists";
import "./Dashboard.css";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchWithAuth("/api/me");
        console.log("Profile from /api/me:", data);
        setProfile(data);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError(err.message || "Failed to load profile");
      }
    };

    loadProfile();
  }, []);

  if (error) {
    return <div style={{ color: "white" }}>Error: {error}</div>;
  }

  if (!profile) {
    return <div style={{ color: "white" }}>Loading profile...</div>;
  }

  return (
    <div className="landing-page">
        <Conversations />
        <Recommendations />
        <NewReleases />
        <TrendingNow />
        <YourLists />
        <CommunityLists />
    </div>
  );
};

export default Dashboard;