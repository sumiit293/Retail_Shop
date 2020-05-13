import axios from 'axios'

const setUserAuth = (token) => {

    if (token) {
        axios.defaults.headers.common["x-authUser-token"] = token;
    } else {
        delete axios.defaults.headers.common["x-authUser-token"];
    }

}

export default setUserAuth;