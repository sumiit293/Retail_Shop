import React, { Fragment } from 'react'

const ProductList = ({ product, serialNo }) => {

    const { productId, productPrice, productName, productCategory } = product;
    return (
        <Fragment>
            <div style={style1}>
                <div>
                    <h4>S.No:{serialNo}</h4>
                </div>
                <div style={{ maxWidth: '20%' }}>
                    <h4><u>ProductId:</u></h4><h5>{productId}</h5>
                </div>
                <div style={{ maxWidth: '20%' }}>
                    <h4><u>Price:  ₹{productPrice}</u></h4><h5>Quantity:1</h5>
                </div>
                <div style={{ maxWidth: '20%' }}>
                    <h4><u>Name:</u> </h4><h5>{productName} </h5>
                </div>
                <div style={{ maxWidth: '20%' }}>
                    <h4><u>Product Category:</u></h4><h5>{productCategory}</h5>
                </div>
            </div>


        </Fragment>
    )
}

export default ProductList
const style1 = {
    display: 'flex',
    flexFlow: 'coloumn wrap',
    justifyContent: 'space-between',
    alinContent: 'center',
    alignItems: 'center',
    marginTop: '30px',
    padding: '10px',
    borderBottom: '1px solid black',


}