import React from 'react';
import Hero from '../Components/LandingPage/hero';
import Explore from '../Components/LandingPage/explore';
import GetStarted from '../Components/LandingPage/getStarted';
import TrendingNow from '../Components/Dashboard/TrendingNow';
import NewReleases from '../Components/Dashboard/NewReleases';
import Community from '../Components/LandingPage/community';
import Reviews from '../Components/LandingPage/reviews';
import Cta from '../Components/LandingPage/cta';
import './LandingPage.css';

// Login Form Component
const LandingPage = () => {
    return (
        <div className="landing-page">
            <Hero />
            <Explore />
            <GetStarted />
            <TrendingNow />
            <NewReleases />
            <Community />
            <Reviews />
            <Cta />
        </div>
    );
};

export default LandingPage;