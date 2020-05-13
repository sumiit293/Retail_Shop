import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import UserAuthContext from '../context/userAuth/userAuthContext'
const PrivateRouteUser = ({ component: Component, ...rest }, ) => {



    const { isUserAuthenticated, userLoading } = useContext(UserAuthContext);
    return (
        <Route
            {...rest}
            render={props =>
                !isUserAuthenticated && !userLoading ? (
                    <Redirect to="/user/login" />
                ) : (
                        <Component {...props} />
                    )

            }
        />
    )
}

export default PrivateRouteUser
