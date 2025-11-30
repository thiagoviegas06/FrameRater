import CreateAccount from '../componentsAC/SignInComponents/CreateAccount';
import './Register.css';

const Register = () => {

    return (
        <div className="register-page">
            <div className="register-background">
                <div className="register-overlay"></div>
            </div>

            <div className="register-content">
                <CreateAccount />
            </div>
        </div>
    );
};

export default Register;