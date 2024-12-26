import React, { useEffect, useState } from 'react';

import { accountService } from '../../../_Service/accountService';

import './index.css';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const handleForgotPassword = () => {
            alert("Mot de passe oublié? Veuillez contacter l'administrateur du site.");
        };

        const forgotPasswordButton = document.querySelector("#mdpoublie");
        if (forgotPasswordButton) {
            forgotPasswordButton.addEventListener("click", handleForgotPassword);
        }

        return () => {
            if (forgotPasswordButton) {
                forgotPasswordButton.removeEventListener("click", handleForgotPassword);
            }
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            email,
            password,
        };

        try {
            const response = await accountService.loginConnect(formData);
            const token = response.data.body.token;
            accountService.savetoken(token);
            navigate("/profile", { replace: true });
        }
        catch (error) {
            if (error.response) { setMessage(error.response.data.message); }
            else { setMessage("Une erreur s'est produite. Veuillez réessayer."); }
        }
    };


    return (
        <main className="main bg-dark">
            <section className="sign-in-content">

                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="sign-in-button">Sign In</button>
                    <p className="message">{message}</p>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default SignIn;