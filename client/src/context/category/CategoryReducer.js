import { SET_PRODUCT_CATEGORY, SET_SEARCH_INPUT, SET_PRODUCT_SEARCH_RESULT, TOTAL_PRODUCT_FETCHED } from '../Types'


export default (state, action) => {

    switch (action.type) {

        case SET_PRODUCT_CATEGORY:
            return {
                ...state,
                category: action.payload
            }
        case SET_SEARCH_INPUT:
            return {
                ...state,
                searchInput: action.payload,
                category: "custom"
            }
        case SET_PRODUCT_SEARCH_RESULT:
            return {
                ...state,
                ProductSearchResult: action.payload,
                loading: false
            }
        case TOTAL_PRODUCT_FETCHED:
            return {
                ...state,
                totalProductFetched: action.payload
            }
        default:
            return {
                state
            }
    }
}