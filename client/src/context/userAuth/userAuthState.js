import React, { useReducer } from 'react'
import UserAuthReducer from './userAuthReducer'
import UserAuthContext from './userAuthContext'
import setUserAuth from './../utility/setUserAuth'
import axios from 'axios'
import {

    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTER_FAIL,
    USER_REGISTER_SUCCESS,
    USER_AUTH_ERROR,
    USER_LOADED,
    USER_LOGOUT,
    REMOVE_ERR,


} from './../Types'



const UserAuthState = (props) => {


    const initialState = {
        userLoading: true,
        isUserAuthenticated: false,
        user: "",
        error: "",

    }



    //loading the user

    const loadUser = async () => {
        // adding the userAuthToken to globalHeaders
        if (localStorage.getItem("userAuthToken")) {
            setUserAuth(localStorage.getItem("userAuthToken"));
        }

        try {
            const response = await axios.get("/api/auth");
            console.log('dispatching user loaded');
            dispatch({
                type: USER_LOADED,
                payload: response.data
            })
            console.log(response.data);

        } catch (error) {
            console.log(error.response.data);
            dispatch({
                type: USER_AUTH_ERROR,
                payload: error

            })
        }

    }

    const login = async (formData) => {
        // for logging the user in
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            var res = await axios.post("/api/auth", formData, config);
            console.log(res.data.msg);
            localStorage.setItem("userAuthToken", res.data.msg);
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: res.data.msg
            })
            loadUser();

        } catch (err) {
            if (err.response) {

                console.log(err.response);
                dispatch({
                    type: USER_LOGIN_FAIL,
                    payload: err.response.data
                })
            }


        }

        removeError();

    }

    const register = async (formData) => {
        //for registering the user
        const config = {
            'content-type': 'application/json'
        }

        try {
            const response = await axios.post("/api/user", formData, config);
            if (response.data.error === undefined) {
                console.log(response.data.msg)
                localStorage.setItem("userAuthToken", response.data.msg);
                dispatch({
                    type: USER_REGISTER_SUCCESS,
                    payload: response.data.msg
                })
                loadUser(localStorage.getItem("userAuthToken"));

            } else {

                dispatch({
                    type: USER_REGISTER_FAIL,
                    payload: response.data.error
                })
                console.log(response.data.error)

                return;

            }
        } catch (error) {

            dispatch({
                type: USER_REGISTER_FAIL,
                payload: error
            })

        }

        removeError();
    }


    const logout = () => {

        localStorage.removeItem("userAuthToken");
        setUserAuth(localStorage.getItem("userAuthToken"));
        dispatch({

            type: USER_LOGOUT,

        })
    }

    const removeError = () => {

        setTimeout(() => {
            dispatch({
                type: REMOVE_ERR
            })
        }, 2000)
    };

    const [state, dispatch] = useReducer(UserAuthReducer, initialState);
    return (
        <UserAuthContext.Provider
            value={{
                userLoading: state.userLoading,
                isUserAuthenticated: state.isUserAuthenticated,
                user: state.user,
                error: state.error,
                login,
                register,
                logout,
                loadUser,
                removeError
            }}


        >
            {props.children}
        </UserAuthContext.Provider>
    )
}

export default UserAuthState
