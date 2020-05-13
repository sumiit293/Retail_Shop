import React, { Fragment, useContext, useEffect } from 'react'
import CartHeader from './CartHeader'
import CartBody from './CartBody'
import CartFooter from './CartFooter'
import CartContext from './../../context/cart/cartContext'
import AuthUserContext from './../../context/userAuth/userAuthContext'
import PopUpMsg from './../../context/utility/popUpMsg'

import { TransitionGroup, CSSTransition } from 'react-transition-group'


const Cart = (props) => {

    const { user, isUserAuthenticated } = useContext(AuthUserContext);
    const { getTotalItemsInCart,
        totalItemInCart,
        cartDetail,
        cartDetails,
        removeFromCart,
        placeOrder,
        info,
        clearCart } = useContext(CartContext);


    useEffect(() => {

        console.log(isUserAuthenticated);
        getTotalItemsInCart();
        cartDetail();


    }, [])

    return (
        <Fragment>
            <CartHeader user={user}
                getTotalItemsInCart={getTotalItemsInCart}
                totalItemInCart={totalItemInCart}
            />

            <TransitionGroup>
                {info && (<CSSTransition key={info + Date.now()} classNames="item" timeout={300}>
                    <center>
                        <PopUpMsg info={info} style={{ margin: "1rem auto" }} />
                    </center>
                </CSSTransition>)}
            </TransitionGroup>
            <CartBody cartDetails={cartDetails}
                cartDetail={cartDetail}
                removeFromCart={removeFromCart}
                totalItemInCart={totalItemInCart}
            />
            {totalItemInCart !== 0 && (<CartFooter placeOrder={placeOrder}
                user={user}
                cartDetails={cartDetails}
                clearCart={clearCart}

            />)}


        </Fragment>
    )
}

export default Cart
