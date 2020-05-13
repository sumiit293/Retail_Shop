import React, { useReducer } from 'react'
import CartContext from './cartContext'
import CartReducer from './CartReducer'
import axios from 'axios'
import {
    ADD_TO_CART_FAIL,
    ADD_TO_CART_SUCCESS,
    REMOVE_INFO,
    TOTAL_CART_ITEM,
    CART_INFO,
    CART_INFO_ERROR,
    REMOVED_FROM_CART,
    ORDER_SUCCESS,
    ORDER_FAIL,
    CLEAR_CART
} from './../Types'
const CartState = (props) => {


    const initialState = {

        isCartEmpty: true,
        totalItemInCart: 0,
        info: "",
        cartDetails: []

    }

    const addToCart = async (product) => {
        const config = {
            headers: {
                "content-type": "application/json"
            }
        }
        try {
            const response = await axios.post("api/cart", product, config);
            console.log(response);
            const data = response.data;
            if (data.msg !== undefined) {
                dispatch({
                    type: ADD_TO_CART_SUCCESS,
                    payload: response.data.msg
                })
                removeInfo();
                return;
            }
            if (data.error !== undefined) {
                dispatch({
                    type: ADD_TO_CART_FAIL,
                    payload: response.data.error
                })
                removeInfo();
                return;
            }

        } catch (error) {
            console.log(error);
            dispatch({
                type: ADD_TO_CART_FAIL,
                payload: error
            })
        }
        removeInfo();

    }
    const clearCart = async () => {

        try {

            await axios.delete("/api/cart/clear");
            dispatch({
                type: CLEAR_CART,
            })
        } catch (error) {
            console.log(error);
        }
    }
    const removeFromCart = async (productID) => {

        try {
            const res = await axios.delete(`/api/cart/remove/${productID}`);
            console.log(res);
            dispatch({
                type: REMOVED_FROM_CART,
                payload: productID
            })

        } catch (error) {
            if (error.response) {
                console.log(error.response);
            }

        }
        removeInfo();
    }
    const getTotalItemsInCart = async () => {

        try {
            const res = await axios.get("/api/cart/count/items");
            dispatch({
                type: TOTAL_CART_ITEM,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
    const placeOrder = async (OrderDetails) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post("/api/cart/order", OrderDetails, config)
            console.log(res);
            dispatch({
                type: ORDER_SUCCESS,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: ORDER_FAIL,

            })
        }

        removeInfo();
    }
    const cartDetail = async () => {

        try {
            const res = await axios.get("/api/cart/cartinfo");
            console.log(res.data);
            dispatch({
                type: CART_INFO,
                payload: res.data
            })

        } catch (error) {
            console.log(error.response.data);
            dispatch({
                type: CART_INFO_ERROR,

            })
        }
    }

    const removeInfo = () => {

        setTimeout(() => {
            dispatch({
                type: REMOVE_INFO
            })
        }, 2000)
    };

    const [state, dispatch] = useReducer(CartReducer, initialState)

    return (
        <CartContext.Provider
            value={{
                info: state.info,
                isCartEmpty: state.isCartEmpty,
                totalItemInCart: state.totalItemInCart,
                cartDetails: state.cartDetails,
                addToCart,
                removeFromCart,
                getTotalItemsInCart,
                cartDetail,
                placeOrder,
                clearCart
            }}

        >
            {props.children}
        </CartContext.Provider>
    )
}

export default CartState
