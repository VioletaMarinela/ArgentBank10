import { setToken, setUser, setUsername } from "../Slicer/AuthSlice";

const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
};

// Function for user sign-in  
export const signIn = async (username, password, dispatch, navigate) => {
    const data = {
        email: username,
        password: password,
    };

    try {
        const response = await fetch('http://localhost:3001/api/v1/user/login', {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error during login: ${errorData.message}`);
        }

        // Extract token from the response  
        const responseData = await response.json();
        const token = responseData.body.token;

        // Dispatch the token into the Redux store  
        dispatch(setToken(token));

        // Fetch user profile after successful login  
        await fetchUserProfile(token, dispatch);

        navigate('/profile');
    } catch (error) {
        console.error("Error during the request:", error);
    }
};

// Function to fetch user profile  
export const fetchUserProfile = async (token, dispatch) => {
    try {
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                ...headers // Merge default headers  
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error fetching profile: ${errorData.message}`);
        }

        const data = await response.json();
        // Dispatch user data to Redux store  
        dispatch(setUser({
            userName: data.body.userName,
            firstName: data.body.firstName,
            lastName: data.body.lastName,
        }));

    } catch (error) {
        console.error('Error during the request:', error);
    }
};

// Function to update username  
export const updateUsername = async (token, newUsername, dispatch) => {
    try {
        const response = await fetch("http://localhost:3001/api/v1/user/profile", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userName: newUsername }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error updating username: ${errorData.message}`);
        }

        const data = await response.json();
        dispatch(setUsername(data.body.userName));
    } catch (error) {
        console.error('Error during the request:', error);
    }
};