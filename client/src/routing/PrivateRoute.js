import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import authContext from './../context/admin/adminContext'



const PrivateRoute = ({ component: Component, ...rest }) => {


    const { isAdminAuthenticated, loading } = useContext(authContext);
    console.log(isAdminAuthenticated);
    return (
        <Route
            {...rest}
            render={props =>
                !isAdminAuthenticated && !loading ? (
                    <Redirect to="/admin/login" />
                ) : (
                        <Component {...props} />
                    )

            }
        />
    )
}

export default PrivateRoute
