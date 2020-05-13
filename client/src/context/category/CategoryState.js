import React, { useReducer } from 'react'
import CatgoryContext from './categoryContext'
import CategoryReducer from './CategoryReducer'
import axios from 'axios'
import { SET_PRODUCT_CATEGORY, SET_SEARCH_INPUT, SET_PRODUCT_SEARCH_RESULT, TOTAL_PRODUCT_FETCHED } from '../Types'
const CategoryState = (props) => {

    const initialState = {
        category: '',
        searchInput: "",
        ProductSearchResult: [],
        totalProductFetched: 0,
        loading: true,
    }
    const [state, dispatch] = useReducer(CategoryReducer, initialState);

    const setCategory = (category) => {
        dispatch({
            type: SET_PRODUCT_CATEGORY,
            payload: category
        })
    }
    const customSearch = (searchInput) => {
        dispatch({
            type: SET_SEARCH_INPUT,
            payload: searchInput
        })

    }
    const getProductByCategory = async (category, skip) => {
        // place holder for product by category
        try {
            const response = await axios.get(`/api/product/${category}/${skip}`);
            const data = response.data;
            console.log(data);
            dispatch({
                type: SET_PRODUCT_SEARCH_RESULT,
                payload: data
            })
        } catch (error) {
            console.log("Couldn't get the product" + error);
        }
    }
    const getTheProductBySearchInput = async (query, skip) => {
        try {
            const response = await axios.get(`/api/product/search/${query}/${skip}`);
            const data = response.data;
            console.log(data);
            dispatch({
                type: SET_PRODUCT_SEARCH_RESULT,
                payload: data
            })

        } catch (error) {
            console.log("Couldn't get the product" + error)
        }

    }
    const getTheEntireProducts = async (skip) => {
        try {
            const response = await axios.get(`/api/product/${skip}`);
            const data = response.data;
            console.log(response);
            dispatch({
                type: SET_PRODUCT_SEARCH_RESULT,
                payload: data
            })

        } catch (error) {

            console.log("Couldn't get the product" + error);

        }
    }
    const gettingTheTotalProductSearched = async (category) => {
        try {
            const response = await axios.get(`/api/product/length/${category}`);
            dispatch({
                type: TOTAL_PRODUCT_FETCHED,
                payload: response.data
            })

        } catch (error) {
            console.log(error);
        }
    }
    const gettingTheTotalProductQueried = async (query) => {
        try {
            const response = await axios.get(`/api/product/search//length${query}`);

            dispatch({
                type: TOTAL_PRODUCT_FETCHED,
                payload: response.data
            })

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <CatgoryContext.Provider
            value={{
                category: state.category,
                searchInput: state.searchInput,
                ProductSearchResult: state.ProductSearchResult,
                loading: state.loading,
                totalProductFetched: state.totalProductFetched,
                setCategory,
                customSearch,
                getProductByCategory,
                getTheProductBySearchInput,
                getTheEntireProducts,
                gettingTheTotalProductSearched,
                gettingTheTotalProductQueried
            }}
        >
            {props.children}
        </CatgoryContext.Provider>
    )
}

export default CategoryState
