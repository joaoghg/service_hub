import axios from 'axios'

const api = axios.create({
    baseURL: `http://192.168.0.118:4000/api`,
    timeout: 20000,
    headers: { 
        'Accept': 'application/json' 
    }
});

export default api