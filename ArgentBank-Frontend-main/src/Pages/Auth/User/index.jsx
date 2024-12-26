import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { accountuser } from '../../../Data/account';
import { accountService } from '../../../_Service/accountService';
import './index.css';

const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");

    // Définir setinfo en utilisant useCallback
    const setinfo = useCallback(async () => {
        const token = accountService.getToken();
        const decodedToken = await accountService.getProfile(token);

        if (decodedToken) {
            setFirstName(decodedToken.firstName);
            setLastName(decodedToken.lastName);
            setUserName(decodedToken.userName);
            dispatch({ type: "User/setUserProfile", payload: { userName: decodedToken.userName } });

            setLoading(false);
        } else {
            setError(true);
        }
    }, [dispatch]);

    // Vérification de la connexion et récupération du profil utilisateur  
    useEffect(() => {
        if (!accountService.ConnectorNotConnect()) {
            navigate('/home');
        } else {
            setinfo();
        }
    }, [navigate, setinfo]);

    const reset = () => {
        setIsEditing(false);
        setUserName(userName);
    };

    const handleUpdate = () => {
        update(userName);
        setIsEditing(false);
    };

    const update = async (userName) => {
        console.log(userName);
        await accountService.updateprofile({ userName: userName });
        dispatch({ type: "User/setUserProfile", payload: { userName: userName } });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <section className="userPage">
            <div className="header">
                {
                    !isEditing &&
                    <div>
                        <h1>Welcome back<br />{firstName} {lastName}!</h1>
                        <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>
                    </div>
                }
                {
                    isEditing &&
                    <div>
                        <h1>Edit user info</h1>
                        <section className='update'>
                            <div className='input-update'>
                                <div className="input-row">
                                    <label>First Name:</label>
                                    <input type='text' value={firstName} disabled className="disabled-input" />
                                </div>
                                <div className="input-row">
                                    <label>Last Name:</label>
                                    <input type='text' value={lastName} disabled className="disabled-input" />
                                </div>
                                <div className="input-row">
                                    <label>User Name:</label>
                                    <input type='text' value={userName} onChange={(e) => setUserName(e.target.value)} />
                                </div>
                            </div>
                            <div className='button-update'>
                                <button className="edit-button" onClick={handleUpdate}>Save</button>
                                <button className="edit-button" onClick={reset}>Cancel</button>
                            </div>
                        </section>
                    </div>
                }
            </div>
            <h2 className="sr-only">Accounts</h2>
            {accountuser.length > 0 ? (
                accountuser.map((account) => (
                    <Account key={account.title} account={account} navigate={navigate} />
                ))
            ) : (
                <p>No accounts available</p>
            )}
        </section>
    );
};

const Account = ({ account, navigate }) => (
    <section className="account">
        <div className="account-content-wrapper">
            <h3 className="account-title">{account.title}</h3>
            <p className="account-amount">{account.amount}</p>
            <p className="account-amount-description">{account.description}</p>
        </div>
        <div className="account-content-wrapper cta">
            <button className="transaction-button" onClick={() => navigate(`/somepath/${account.title}`)}>View transactions</button>
        </div>
    </section>
);

export default UserProfile;
