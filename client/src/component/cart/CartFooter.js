import React, { Fragment } from 'react'

const CartFooter = ({ placeOrder, cartDetails, user, clearCart }) => {

    const GrandTotal = () => {
        let totalsum = 0;
        cartDetails.map((product) => {
            totalsum += product.productPrice
        })
        return totalsum;
    }
    const address = user.address;
    const phone = user.phone;
    const name = user.name;
    const productList = cartDetails;
    const totalSum = GrandTotal();
    const place_order = () => {
        placeOrder({
            phone,
            address,
            productList,
            totalSum,
            name
        })
        setTimeout(() => {
            clearCart();
        }, 2000);

    }
    return (
        <Fragment>
            <div style={style}>
                <div>Grand Total</div>
                <div>{totalSum}</div>
            </div>
            <button style={style1} className="btn btn-block" onClick={place_order}>Order</button>
        </Fragment>
    )
}

export default CartFooter
const style = {
    display: 'flex',
    backgroundColor: 'grey',
    padding: '10px',
    justifyContent: 'space-between',
    color: 'white',
    flexFlow: 'coloum wrap',



}
const style1 = {
    padding: '8px',
    textAlign: 'center',
    width: '100%',
    cursor: 'pointer',
    backgroundColor: 'grey',
    marginTop: '5px',
    color: 'white',
    marginBottom: '10px'

}