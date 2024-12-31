import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUsername } from '../../../Redux/Api/callApi';

const EditUser = ({ onCancel }) => {
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    // Initialize state to avoid errors before user data is loaded  
    const [editedUsername, setEditedUsername] = useState(user?.userName || "");
    const [firstname, setFirstname] = useState(user?.firstName || "");
    const [lastname, setLastname] = useState(user?.lastName || "");

    // Update editedUsername when user.userName changes  
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
            setEditedUsername(""); // Clear input field after saving  
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
                <input className='editProfilInput'
                    type="text"
                    id="editedUsername"
                    value={editedUsername}
                    onChange={(e) => setEditedUsername(e.target.value)}
                />
            </div>
            <div className='editProfil-container'>
                <label className='editLabelProfil' htmlFor="editedFirstname">First Name:</label>
                <input className='editProfilInput'
                    type="text"
                    id="editedFirstname"
                    value={firstname}
                    readOnly // Only display, no editing  
                />
            </div>
            <div className='editProfil-container'>
                <label className='editLabelProfil' htmlFor="editedLastname">Last Name:</label>
                <input className='editProfilInput'
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

export default EditUser;