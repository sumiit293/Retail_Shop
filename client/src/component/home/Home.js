import React, { Fragment, useContext } from 'react'
import Header from './Header'
import Body from './Body'
import categoryContext from '../../context/category/categoryContext'
const Home = (props) => {

    const { customSearch } = useContext(categoryContext);
    const redirect = () => {
        props.history.push("/products");
    }


    return (
        <Fragment>
            <Header customSearch={customSearch} redirect={redirect} />
            <Body redirect={redirect} />
        </Fragment>
    )
}

export default Home
