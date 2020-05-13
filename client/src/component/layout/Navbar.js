import React, { Fragment, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserAuthContext from './../../context/userAuth/userAuthContext'
import adminAuthContext from './../../context/admin/adminContext'
const Navbar = () => {

    const history = useHistory();
    const { isUserAuthenticated, loadUser, logout } = useContext(UserAuthContext);
    const { isAdminAuthenticated } = useContext(adminAuthContext);
    const adminauth = useContext(adminAuthContext);
    const userLogout = () => {
        logout();
        history.push("/");
    }
    const adminLogout = () => {
        adminauth.logout();
        history.push("/");


    }
    useEffect(() => {

        loadUser();
        // eslint-disable-next-line
    }, [isUserAuthenticated])

    return (
        <Fragment>

            <div className="navbar" style={{ backgroundColor: 'blue', color: 'white' }}>
                <h1 >Retail   <span>Store</span></h1>

                <ul>
                    {!isAdminAuthenticated && (<li><Link to="/">Home</Link></li>)}
                    {(!isUserAuthenticated && !isAdminAuthenticated) && (<li><Link to="/user/login"> User Login</Link></li>)}
                    {(!isAdminAuthenticated && !isUserAuthenticated) && (<li><Link to="/admin/login"> Admin Login</Link></li>)}
                    {(isAdminAuthenticated) && (<li><Link to="/admin/order"> Order</Link></li>)}
                    {(isAdminAuthenticated) && (<li><Link to="/admin/dashboard"> Admin Dashboard</Link></li>)}
                    {(isAdminAuthenticated) && (<li><Link to="#!" onClick={adminLogout}> Admin Logout</Link></li>)}
                    {isUserAuthenticated && (<li><Link to="/products/cart"><span style={{ fontStyle: 'italic' }}><i className="fa fa-shopping-cart" />Cart</span></Link></li>)}
                    {isUserAuthenticated && (<li><span style={{ fontStyle: 'italic', cursor: 'pointer' }} onClick={userLogout}>Logout</span></li>)}


                </ul>
            </div>
        </Fragment>
    )
}

export default Navbar
