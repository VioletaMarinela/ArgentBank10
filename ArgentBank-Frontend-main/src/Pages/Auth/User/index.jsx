import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateUsername } from '../../../Redux/Api/callApi';
import { useNavigate } from 'react-router-dom';
import { accountuser } from '../../../Data/account';

const UserProfile = () => {
    const user = useSelector((state) => state.auth?.user);
    const token = useSelector((state) => state.auth?.token);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/home', { replace: true });
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                console.log('Fetching user profile with token:', token); // Log the token  
                await fetchUserProfile(token, dispatch);
                console.log('User profile fetched successfully'); // Log success  
            } catch (error) {
                setError('Une erreur s\'est produite lors de la récupération du profil.');
                console.error('Une erreur s\'est produite lors de la récupération du profil :', error);
            } finally {
                setLoading(false); // Ensure loading is set to false regardless of error/success  
            }
        };

        fetchData();
    }, [token, dispatch, navigate]);

    console.log('User state:', user); // Log the user state  

    const handleEditButtonClick = () => {
        setIsEditing(true);
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <main className="main bg-dark">
            <div className="header">
                <div>
                    {error && <p>{error}</p>}
                    {!isEditing && user && <h1>Welcome back<br />{user.firstName} {user.lastName}!</h1>}
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
                <p>No accounts available</p>
            )}
        </main>
    );
};

const EditUser = ({ onCancel }) => {
    const token = useSelector((state) => state.auth?.token);
    const user = useSelector((state) => state.auth?.user);
    const dispatch = useDispatch();

    const [editedUsername, setEditedUsername] = useState(user?.userName || "");
    const [firstname, setFirstname] = useState(user?.firstName || "");
    const [lastname, setLastname] = useState(user?.lastName || "");

    useEffect(() => {
        if (user) {
            setEditedUsername(user.userName);
            setFirstname(user.firstName);
            setLastname(user.lastName);
        }
    }, [user]);

    const handleSaveButtonClick = async () => {
        try {
            await updateUsername(token, editedUsername, dispatch);
            onCancel(); // Call the onCancel function to exit editing mode  
        } catch (error) {
            console.error("Failed to update username:", error);
            // Optionally, set an error state to notify the user  
        }
    };

    return (
        <div className='editProfil-main'>
            <h2 className='editTitle'>Edit User Info</h2>
            <div className='editProfil-container'>
                <label className='editLabelProfil' htmlFor="editedUsername">User Name:</label>
                <input
                    className='editProfilInput'
                    type="text"
                    id="editedUsername"
                    value={editedUsername}
                    onChange={(e) => setEditedUsername(e.target.value)}
                />
            </div>
            <div className='editProfil-container'>
                <label className='editLabelProfil' htmlFor="editedFirstname">First Name:</label>
                <input
                    className='editProfilInput'
                    type="text"
                    id="editedFirstname"
                    value={firstname}
                    readOnly // Only display, no editing  
                />
            </div>
            <div className='editProfil-container'>
                <label className='editLabelProfil' htmlFor="editedLastname">Last Name:</label>
                <input
                    className='editProfilInput'
                    type="text"
                    id="editedLastname"
                    value={lastname}
                    readOnly // Only display, no editing  
                />
            </div>
            <div className='editProfilButtonContainer'>
                <button className='editProfilButton' onClick={handleSaveButtonClick}>Save</button>
                <button className='editProfilButton' onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};


export default UserProfile;