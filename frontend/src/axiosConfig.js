import axios from 'axios';

const instance = axios.create({
    baseURL: '', // Relative URL for same-origin proxy
    withCredentials: true
});

export default instance;
