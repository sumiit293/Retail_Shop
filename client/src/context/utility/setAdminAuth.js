import axios from 'axios';

const setAdminAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['x-adminAuth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-adminAuth-token'];
    }
}

export default setAdminAuthToken;