import { ORDER_FETCHED_FAILED, ORDER_FETCHED_SUCCESS } from './../Types'
export default (state, action) => {
    switch (action.type) {

        case ORDER_FETCHED_SUCCESS:
            return {
                ...state,
                orderlist: action.payload,
                loading: false
            }
        case ORDER_FETCHED_FAILED:
            return {
                ...state,

                loading: false
            }
    }
}