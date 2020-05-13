import React, { useReducer } from 'react'
import AdminContenxt from './adminContext';
import adminReducer from './adminReducer';
import setAdminAuthToken from '../utility/setAdminAuth';
import axios from 'axios';
import {
    ADMIN_REGISTER_SUCCESS,
    ADMIN_REGISTER_FAIL,
    ADMIN_LOADED,
    ADMIN_AUTH_ERROR,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAIL,
    ADMIN_LOGOUT,
    REMOVE_ERROR
} from './../Types'

const AdminAuthState = (props) => {

    const initialState = {
        adminToken: localStorage.getItem('adminToken'),
        isAdminAuthenticated: false,
        admin: "",
        loading: true,
        error: ""

    }

    const [state, dispatch] = useReducer(adminReducer, initialState);
    //load admin
    const loadAdmin = async () => {
        //@todo- load adminToken into global headers
        if (localStorage.getItem('adminToken')) {
            setAdminAuthToken(localStorage.getItem('adminToken'));
        }

        try {

            const res = await axios.get("/api/admin/auth");
            dispatch({
                type: ADMIN_LOADED,
                payload: res.data
            })

        } catch (error) {
            localStorage.removeItem('adminToken');
            console.log(error);
            dispatch({
                type: ADMIN_AUTH_ERROR
            })
        }
    }


    // register admin
    const register = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post("/api/admin/user", formData, config);

            dispatch({
                type: ADMIN_REGISTER_SUCCESS,
                payload: res.data
            })
            loadAdmin();

        } catch (error) {
            if (error.response.data.msg.errors) {
                dispatch({
                    type: ADMIN_REGISTER_FAIL,
                    payload: error.response.data.msg.errors[0].msg
                })
            } else {
                dispatch({
                    type: ADMIN_REGISTER_FAIL,
                    payload: error.response.data.msg
                })
            }




        }
        setTimeout(() => { dispatch({ type: REMOVE_ERROR }) }, 5000);
    }

    // login admin
    const login = async (FormData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post("/api/admin/auth", FormData, config);
            console.log(res.data);
            dispatch({
                type: ADMIN_LOGIN_SUCCESS,
                payload: res.data
            })
            loadAdmin();
        } catch (error) {

            dispatch({
                type: ADMIN_LOGIN_FAIL,
                payload: error.response.data
            })
        }

        setTimeout(() => { dispatch({ type: REMOVE_ERROR }) }, 5000);
    }
    // logout admin
    const logout = () => {

        dispatch({
            type: ADMIN_LOGOUT
        })

    }


    return (
        <AdminContenxt.Provider
            value={{
                adminToken: state.adminToken,
                isAdminAuthenticated: state.isAdminAuthenticated,
                loading: state.loading,
                admin: state.admin,
                error: state.error,
                register,
                loadAdmin,
                login,
                logout
            }}>
            {props.children}
        </AdminContenxt.Provider>
    )


}
export default AdminAuthState;
