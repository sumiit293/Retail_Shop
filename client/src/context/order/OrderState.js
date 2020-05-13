import React, { useState, Fragment, useReducer } from 'react'
import OrderContext from './OrderContext'
import OrderReducer from './OrderReducer'
import axios from 'axios'
import { ORDER_FETCHED_FAILED, ORDER_FETCHED_SUCCESS } from './../Types'
const OrderState = (props) => {



    const initialState = {
        orderlist: [],
        loading: false

    }

    const [state, dispatch] = useReducer(OrderReducer, initialState);

    //getting the latest 200 order
    const fetchOrder = async (req, res) => {
        try {
            const res = await axios.get("/api/order/order");
            console.log(res.data)
            dispatch({
                type: ORDER_FETCHED_SUCCESS,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: ORDER_FETCHED_FAILED
            })
        }
    }
    // fetched filterd orders
    const filterdOrder = () => {

    }


    return (
        <OrderContext.Provider
            value
            ={{
                orderlist: state.orderlist,
                loading: state.loading,
                fetchOrder
            }}
        >
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderState
