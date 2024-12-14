// UserProfile.js  
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import arrowRightImg from '../../Assets/img/arrow_right.png';
import { accountuser } from '../../Assets/Data/account';
import { accountService } from '../../_Service/accountService';
import '../../Assets/css/User.css';

const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [userName, setuserName] = useState("");

    // Vérification de la connexion et récupération du profil utilisateur  
    useEffect(() => {
        if (!accountService.ConnectorNotConnect()) {
            navigate('/home');
        } else {
            setinfo()
        }
    }, [dispatch, navigate]);

    const setinfo = async () => {
        const token = accountService.getToken();
        const decodetoken = await accountService.getProfile(token);

        if (decodetoken) {
            setFirstName(decodetoken.firstName);
            setlastName(decodetoken.lastName);
            setuserName(decodetoken.userName);
            dispatch({ type: "User/setUserProfile", payload: { userName: decodetoken.userName } })

            setloading(false)
        } else {
            seterror(true)
        }
    }

    let reset = () => {
        setIsEditing(false)
        setuserName(userName)
    }

    let handleUpdate = () => {
        update(userName)
        setIsEditing(false)
    }

    const update = async () => {
        await accountService.updateprofile({ userName: userName })
        dispatch({ type: "User/setUserProfile", payload: { userName: userName } })
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <section>
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
                                    <input type='text' value={userName} onChange={(e) => setuserName(e.target.value)} />
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
                    <section className="account" key={account.title}>
                        <div className="account-content-wrapper">
                            <h3 className="account-title">{account.title}</h3>
                            <p className="account-amount">{account.amount}</p>
                            <p className="account-amount-description">{account.description}</p>
                        </div>
                        <div className="account-content-wrapper cta">
                            <img
                                src={arrowRightImg}
                                alt="Navigate"
                                onClick={() => navigate(`/somepath/${account.title}`)}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    </section>
                ))
            ) : (
                <p>No accounts available</p> // Message si aucun compte n’est disponible  
            )}
        </section>
    );
};

export default UserProfile;