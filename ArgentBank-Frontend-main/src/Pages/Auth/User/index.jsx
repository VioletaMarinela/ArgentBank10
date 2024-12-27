import React, { useEffect, useState } from 'react';
import EditUser from './editUser';
import { accountuser } from '../../../Data/account';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../../Redux/Api/callApi';

const UserProfile = () => {
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchUserProfile(token, dispatch);
            } catch (error) {
                setError('Une erreur s\'est produite lors de la récupération du profil.');
                console.error('Une erreur s\'est produite lors de la récupération du profil :', error);
            }
        };

        if (token) {
            fetchData();
        }
    }, [token, dispatch]);

    const handleEditButtonClick = () => {
        setIsEditing(true);
    };

    return (
        <main className="main bg-dark">
            <div className="header">
                <div>
                    {error && <p>{error}</p>}
                    {!isEditing && user && <h1>Welcome back<br />{user.userName}</h1>}
                    {!isEditing && !user && <p>Loading user data...</p>}
                </div>
                {isEditing ? (
                    <EditUser onCancel={() => setIsEditing(false)} />
                ) : (
                    <div className='edit-button-container'>
                        <button className="edit-button" onClick={handleEditButtonClick}>
                            Edit Name
                        </button>
                    </div>
                )}
            </div>
            <h2 className="sr-only">Accounts</h2>
            {accountuser.length > 0 ? (
                accountuser.map((account) => (
                    <section className="account" key={account.title}>
                        <div className="account-content-wrapper">
                            <h3 className="account-title">{account.title}</h3>
                            <p className="account-amount">{account.amount}</p>
                            <p className="account-amount-description">{account.description}</p>
                        </div>
                        <div className="account-content-wrapper cta">
                            <button className="transaction-button">View transactions</button>
                        </div>
                    </section>
                ))
            ) : (
                <p>No accounts available</p> // Message si aucun compte n’est disponible  
            )}
        </main>
    );
};

export default UserProfile;