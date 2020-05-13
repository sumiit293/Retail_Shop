import React, { Fragment, useContext, useEffect } from 'react'
import OrderHeader from './OrderHeader'
import OrderSection from './OrderSection'
import OrderContext from './../../context/order/OrderContext'
import AdminContext from './../../context/admin/adminContext'


const OrderDashBoard = () => {



    const { fetchOrder, orderlist } = useContext(OrderContext);
    const { loadAdmin } = useContext(AdminContext);

    useEffect(() => {
        loadAdmin()
        fetchOrder()

        //eslint next line disable
    }, [])
    return (
        <Fragment>
            <OrderHeader />
            <div style={{ paddingBottom: '10px' }}><h2>Received Orders</h2></div>
            {orderlist.map((order) => (<OrderSection key={order.id} orderdetail={order} />))}

        </Fragment>
    )
}

export default OrderDashBoard
