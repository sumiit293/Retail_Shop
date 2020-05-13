import {
    PRODUCT_UPLOAD_IMAGE_SUCCESS,
    PRODUCT_UPLOAD_IMAGE_FAILED,
    PRODUCT_UPLOAD_INFO_FAILED,
    PRODUCT_UPLOAD_INFO_SUCCESS,
    TRANSIT_STATE
} from './../Types';

export default (state, action) => {

    switch (action.type) {




        case TRANSIT_STATE:
            return {
                ...state,
                ...action.payload,
                timer: !state.timer,
                productInfoUploadedInfo: null


            }
        case PRODUCT_UPLOAD_IMAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                productImageUploadedInfo: action.payload


            }
        case PRODUCT_UPLOAD_IMAGE_FAILED:
            return {
                ...state,
                loading: false,
                prdctError: action.payload,


            }
        case PRODUCT_UPLOAD_INFO_FAILED:
            return {
                ...state,
                loading: false,
                prdctError: action.payload

            }
        case PRODUCT_UPLOAD_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                productInfoUploadedInfo: action.payload

            }
        default:
            return {
                ...state,
                loading: false,
                productInfoUploaded: action.payload
            }


    }
}