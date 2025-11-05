import React from 'react';
import Hero from '../Components/LandingPage/hero';
import Explore from '../Components/LandingPage/explore';
import GetStarted from '../Components/LandingPage/getStarted';
import Trending from '../Components/LandingPage/trending';
import Releases from '../Components/LandingPage/releases';
import Community from '../Components/LandingPage/community';
import Reviews from '../Components/LandingPage/reviews';
import Cta from '../Components/LandingPage/cta';
import './landingpage.css';

// Login Form Component
const LandingPage = () => {
    return (
        <div className="landing-page">
            <Hero />
            <Explore />
            <GetStarted />
            <Trending />
            <Releases />
            <Community />
            <Reviews />
            <Cta />
        </div>
    );
};

export default LandingPage;