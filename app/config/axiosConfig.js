import axios from 'axios'

const api = axios.create({
    baseURL: `http://172.29.11.60:4000/api`,
    timeout: 20000,
    headers: { 
        'Accept': 'application/json' 
    }
});

export default api