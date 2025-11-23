import React from 'react';
import ProfileBanner from '../componentsAC/ProfilePageComponents/ProfileBanner.js';
import ProfileOverlay from '../componentsAC/ProfilePageComponents/ProfileOverlay.js';
import ProfileTextBox from '../componentsAC/ProfilePageComponents/ProfileTextBox.js';
import UserCommentCard from '../componentsAC/ProfilePageComponents/UserCommentCard.js';
import YourList from '../Components/Dashboard/YourLists';
import './Profile.css';

// Profile Page Component
const Profile = () => {
    return (
        <div className="landing-page">
            <ProfileOverlay />
        </div>
    );
};

export default Profile;
