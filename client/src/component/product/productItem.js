import React, { Fragment, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import UserAuthContext from './../../context/userAuth/userAuthContext'
import CartContext from './../../context/cart/cartContext'





const ProductItems = ({ product: { _id, name, price, image, description, category, subCategory }, openModal, fetchInfoForModal }) => {
    const { isUserAuthenticated } = useContext(UserAuthContext);
    const { addToCart } = useContext(CartContext);


    const m1 = () => {
        fetchInfoForModal(name, price, category, subCategory, description);
        console.log(name, description, _id);
        openModal();
    }
    const history = useHistory();

    const cartAdd = (props) => {

        if (isUserAuthenticated) {
            addToCart({
                _id,
                name,
                category,
                price
            });
        } else {
            history.push("/user/login");
        }
    }
    return (
        <Fragment>
            <div className="card text-center productitem">
                <center>
                    <img src={`${process.env.PUBLIC_URL}/upload/productPhotos/${image[0]}`}
                        alt="Image Not Available" onClick={m1} />
                    <h3 className="trim">{name}</h3>
                    <h3>₹ {price}</h3>

                    <button className="btn btn-primary btn-sm" onClick={cartAdd}>Add to Cart</button><br />
                </center>
            </div>
        </Fragment>
    )
}
//const imageSrc = `upload/productPhotos/${imgUrl}`

export default ProductItems
