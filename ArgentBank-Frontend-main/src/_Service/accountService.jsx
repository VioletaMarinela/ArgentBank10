import Axios from './callerService.jsx';

let loginConnect = (data) => {
    return Axios.post('/api/v1/user/login', data)
}

let getProfile = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return await Axios
        .get('/api/v1/user/profile', config)
        .then((res) => { return res.data.body })
        .catch((error) => { return error })
}

let updateprofile = async (username) => {
    const config = {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    }
    return await Axios
        .put('/api/v1/user/profile', username, config)
        .then((res) => { return res.data.body })
        .catch((error) => { return error })
}

let logout = () => {
    localStorage.removeItem('KeyToken')
}

let savetoken = (token) => {
    localStorage.setItem('KeyToken', token);
}

let getToken = () => {
    return localStorage.getItem("KeyToken");
}

let ConnectorNotConnect = () => {
    let token = getToken();
    return !!token
}

export const accountService = {
    loginConnect,
    logout,
    savetoken,
    getToken,
    getProfile,
    updateprofile,
    ConnectorNotConnect
}