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

export default (state, action) => {

    switch (action.type) {
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                userLoading: false,

            }
        case USER_REGISTER_FAIL:
            return {
                ...state,
                userLoading: false,
                isUserAuthenticated: false,
                error: action.payload

            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                userLoading: false
            }

        case USER_LOGIN_FAIL:
            return {
                ...state,
                userLoading: false,
                isUserAuthenticated: false,
                error: action.payload
            }
        case USER_LOADED:

            return {
                ...state,
                ...action.payload,

                isUserAuthenticated: true,
                user: action.payload
            }
        case USER_AUTH_ERROR:
            return {
                ...state,

                isUserAuthenticated: false,
                user: null
            }
        case USER_LOGOUT:

            return {
                ...state,
                userLoading: true,
                isUserAuthenticated: false,
                user: "",
            }
        case REMOVE_ERR:
            return {
                ...state,
                error: ""
            }
        default:
            return {
                ...state
            }
    }

}