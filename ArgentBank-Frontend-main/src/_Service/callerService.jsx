import axios from 'axios';

const Axios = axios.create({
    baseURL: 'http://localhost:3001',
});

/**  
 * Interceptor pour injection token  
 */
Axios.interceptors.request.use(request => {
    const token = localStorage.getItem('token');
    if (token) {
        request.headers['Authorization'] = `Bearer ${token}`;
    }
    return request;
});

/**  
 * Interceptor des réponses de l'API  
 */
Axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response) {
        console.error('Erreur de réponse:', error.response.data);
        console.error('Statut:', error.response.status);
        console.error('En-têtes:', error.response.headers);
    } else if (error.request) {
        console.error('Erreur de requête:', error.request);
    } else {
        console.error('Erreur:', error.message);
    }
    return Promise.reject(error); // Renvoi de l'erreur pour gestion  
});

export default Axios;