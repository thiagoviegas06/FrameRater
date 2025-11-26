import React from 'react';
import SignInCard from '../componentsAC/SignInComponents/SignInCard';
import './Login.css';

const Login = () => {
    return (
        <div className="login-page">
            <div className="login-background">
                <div className="login-overlay"></div>
            </div>

            <div className="login-content">
                <SignInCard />
            </div>
        </div>
    );
};

export default Login;