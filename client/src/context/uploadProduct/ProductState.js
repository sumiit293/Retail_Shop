import React, { useReducer } from 'react'
import ProductContext from './productContext'
import ProductReducer from './ProductReducer'
import axios from 'axios';
import {
    PRODUCT_UPLOAD_IMAGE_SUCCESS,
    PRODUCT_UPLOAD_IMAGE_FAILED,
    PRODUCT_UPLOAD_INFO_FAILED,
    PRODUCT_UPLOAD_INFO_SUCCESS,
    TRANSIT_STATE,
} from './../Types';



const ProductState = (props) => {


    const InitialState = {

        loading: true,
        timer: true,
        productImageUploadedInfo: null,
        productInfoUploadedInfo: null,
        prdcterror: null
    }


    const [state, dispatch] = useReducer(ProductReducer, InitialState)

    const UploadProductInfo = async (item) => {


        // getting the product info to database

        try {
            const res = await axios.post("/api/product", item);
            dispatch({
                type: PRODUCT_UPLOAD_INFO_SUCCESS,
                payload: res.data
            })
            timer();
            console.log(res.data);
        } catch (error) {

            console.log(error)
            dispatch({
                type: PRODUCT_UPLOAD_INFO_FAILED,
                payload: error.response
            })
            timer();
        }
    }

    const UploadProductImage = async (formdata) => {
        //getting the product image to server
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const res = await axios.post("/api/img", formdata, config);
            dispatch({
                type: PRODUCT_UPLOAD_IMAGE_SUCCESS,
                payload: res.data
            })
            console.log(res);
            timer();

        } catch (error) {
            console.log(error)
            dispatch({
                type: PRODUCT_UPLOAD_IMAGE_FAILED,
                payload: error.response
            })
            timer();
        }


    }
    const timer = () => {
        setTimeout(() => {
            dispatch({
                type: TRANSIT_STATE
            })
        }, 3000)
    }

    return (
        <ProductContext.Provider
            value={{
                loading: state.loading,
                timer: state.timer,
                productImageUploadedInfo: state.productImageUploadedInfo,
                productInfoUploadedInfo: state.productInfoUploadedInfo,
                UploadProductInfo,
                UploadProductImage
            }}>

            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductState