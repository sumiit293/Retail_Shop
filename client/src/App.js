import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AdminAuthState from './context/admin/adminAuthState'
import ProductState from './context/uploadProduct/ProductState'
import CategoryState from './context/category/CategoryState'
import PrivateRouteAdmin from './routing/PrivateRoute'
import PrivateRouteUser from './routing/PrivateRouteUser'
import Navbar from './component/layout/Navbar'
import Login from './component/AdminPage/login'
import Register from './component/AdminPage/register'
import AdminDashboard from './component/AdminPage/AdminDashboard';
import Products from './component/product/products'
import Cart from './component/cart/Cart'
import Home from './component/home/Home'
import userLogin from './component/userAuth/login'
import userRegister from './component/userAuth/Register'
import UserAuthState from './context/userAuth/userAuthState'
import CartState from './context/cart/CartState'
import OrderDasboard from './component/AdminPage/OrderDashBoard'
import OrderState from './context/order/OrderState'
import OrderSlip from './component/AdminPage/OrderSlip'

import './App.css';

const App = () => {
  return (

    <AdminAuthState>
      <ProductState>
        <CategoryState>
          <UserAuthState>
            <CartState>
              <OrderState>
                <Router>
                  <Fragment>
                    <Navbar />

                    <Route>
                      <Switch>
                        <Route exact path="/" component={Home} />
                        <div className="container">
                          <Route exact path="/products" component={Products} />
                          <PrivateRouteUser exact path="/products/cart" component={Cart} />
                          <Route exact path="/user/login" component={userLogin} />
                          <Route exact path="/user/register" component={userRegister} />
                          <Route exact path="/admin/login" component={Login} />
                          <Route exact path="/admin/register" component={Register} />
                          <PrivateRouteAdmin exact path="/admin/dashboard" component={AdminDashboard} />
                          <PrivateRouteAdmin exact path="/admin/order" component={OrderDasboard} />
                          <PrivateRouteAdmin exact path="/admin/order/orderslip" component={OrderSlip} />
                        </div>
                      </Switch>
                    </Route>
                  </Fragment>
                </Router>
              </OrderState>
            </CartState>
          </UserAuthState>
        </CategoryState>
      </ProductState>
    </AdminAuthState>

  );
}

export default App;