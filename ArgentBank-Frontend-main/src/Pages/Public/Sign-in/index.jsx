import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../../Redux/Api/callApi';

const SignIn = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSignIn = async () => {
        try {
            await signIn(username, password, dispatch, navigate);
        } catch (error) {
            setError("Erreur lors de la connexion. Veuillez vérifier vos identifiants.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        await handleSignIn();
    };

    return (
        <div className='login'>
            < section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username" >Username</label>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="sign-in-button">Sign In</button>

                </form>
            </section>
        </div >
    );
};

export default SignIn;
