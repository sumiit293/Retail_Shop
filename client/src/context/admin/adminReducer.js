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

export default (state, action) => {

    switch (action.type) {


        case ADMIN_LOGIN_SUCCESS:
            localStorage.setItem('adminToken', action.payload);
            return {
                ...state,
                ...action.payload,
                isAdminAuthenticated: true,
                adminToken: action.payload,
                loading: false,
                error: ""
            }
        case ADMIN_REGISTER_SUCCESS:
            localStorage.setItem('adminToken', action.payload);
            return {
                ...state,
                isAdminAuthenticated: true,
                loading: false,
                error: ""
            }
        case ADMIN_REGISTER_FAIL:
        case ADMIN_AUTH_ERROR:
            localStorage.removeItem('adminToken');
            return {
                ...state,
                isAdminAuthenticated: false,
                loading: false,
                admin: "",
                error: action.payload


            }
        case ADMIN_LOGIN_FAIL:
            localStorage.removeItem('adminToken');
            return {
                ...state,
                isAdminAuthenticated: false,
                loading: false,
                admin: "",
                error: action.payload

            }
        case ADMIN_LOADED:
            return {
                ...state,
                ...action.payload,
                isAdminAuthenticated: true,
                loading: false,
                admin: action.payload,
                error: ""

            }
        case ADMIN_LOGOUT:
            localStorage.removeItem('adminToken');
            return {
                ...state,
                adminToken: "",
                isAdminAuthenticated: false,
                loading: true,
                admin: null,
                error: action.payload
            }
        case REMOVE_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}