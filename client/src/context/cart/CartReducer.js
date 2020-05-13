import {
    ADD_TO_CART_FAIL,
    ADD_TO_CART_SUCCESS,
    REMOVE_INFO,
    TOTAL_CART_ITEM,
    CART_INFO_ERROR,
    CART_INFO,
    REMOVED_FROM_CART,
    ORDER_SUCCESS,
    ORDER_FAIL,
    CLEAR_CART
} from './../Types'

export default (state, action) => {

    switch (action.type) {

        case ADD_TO_CART_SUCCESS:
            return {
                ...state,
                info: action.payload
            }
        case TOTAL_CART_ITEM:
            return {
                ...state,
                totalItemInCart: action.payload
            }
        case REMOVE_INFO:
            return {
                ...state,
                info: ''
            }
        case CART_INFO:
            return {
                ...state,
                cartDetails: action.payload
            }
        case CART_INFO_ERROR:
            return {
                ...state,
                cartDetails: null
            }
        case REMOVED_FROM_CART:
            return {
                ...state,
                cartDetails: state.cartDetails.filter((product) => (product.productId !== action.payload)),
                totalItemInCart: state.totalItemInCart - 1
            }
        case CLEAR_CART:
            return {
                ...state,
                cartDetails: [],
                totalItemInCart: 0,

            }
        case ORDER_SUCCESS:
            return {
                ...state,
                info: action.payload
            }
        case ORDER_FAIL:
            return {
                ...state,
                info: action.payload
            }
        default:
            return {
                ...state
            }
    }
}