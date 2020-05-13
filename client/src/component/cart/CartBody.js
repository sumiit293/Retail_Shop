import React, { Fragment } from 'react'
const CartBody = ({ totalItemInCart, cartDetails, removeFromCart }) => {


    const remove = (e) => {

        const ProductId = (e.target).parentElement.nextElementSibling.innerText;
        removeFromCart(ProductId);
    }


    return (
        <Fragment>
            <div style={{ marginBottom: '20px', minHeight: '30vh' }} className="main">

                {totalItemInCart !== 0 ? cartDetails.map((product) => (<div className="card-cart" key={product.productId} style={style} >
                    <div style={itemstyle}><i className="fa fa-remove button" onClick={remove} /></div>
                    <div className="hide-sm" style={itemstyle}>{product.productId}</div>
                    <div style={itemstyle}>{product.productName}</div>
                    <div className="hide-sm" style={itemstyle}>{product.productCategory}</div>
                    <div style={itemstyle}>{product.productPrice}</div>
                </div>)) : (<h2 style={{ marginTop: '100px' }}>Your <span><i className="fa fa-shopping-cart fa-lg" aria-hidden="true" /></span> is empty !</h2>)}

            </div>
        </Fragment>
    )
}

export default CartBody;
const style = {
    display: 'flex',
    flexFlow: 'coloum wrap',
    padding: '5px',
    fontSize: 'small',
    justifyContent: 'space-between',
    marginTop: '10px',
    alignContent: 'center',
    borderBottom: '1px solid black',
    backgroundColor: 'steelblue',
    opacity: '0.7',


}
const itemstyle = {
    color: 'white'

}
/*
  {totalItemInCart !== 0 ? cartDetails.map((product) => (<div style={style}>
                <div className="hide-sm" style={itemstyle}>{product.productId}</div>
                <div style={itemstyle}>{product.productName}</div>
                <div className="hide-sm" style={itemstyle}>{product.productCategory}</div>
                <div style={itemstyle}>{product.productPrice}</div>
            </div>)) : (<h2 style={{ marginTop: '100px' }}>Your <span><i class="fa fa-shopping-cart fa-lg" aria-hidden="true" /></span> is empty !</h2>)}

            */