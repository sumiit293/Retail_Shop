import React, { Fragment, useEffect, useContext } from 'react'

const CartHeader = ({ user, totalItemInCart }) => {



    return (
        <Fragment>
            <div style={style}>
                <div style={itemstyle}>{user.name}</div>
                <div style={itemstyle}>Cart summary</div>
                <div style={itemstyle}><i className="fa fa-shopping-cart" aria-hidden="true" /> {totalItemInCart}</div>
            </div>
        </Fragment>
    )
}

export default CartHeader;
const style = {
    display: 'flex',
    flexFlow: 'coloum wrap',
    backgroundColor: 'steelblue',
    padding: '10px',
    fontSize: 'large',
    marginTop: '50px',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: '50px',
    borderBottom: '2px solid black',
    boxShadow: '0px 0px 5px 5px'


}
const itemstyle = {
    color: 'white'
}
