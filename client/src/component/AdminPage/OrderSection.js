import React, { Fragment, useContext } from 'react'
import { useHistory } from 'react-router-dom'
const OrderPage = ({ orderdetail }) => {

    const { address, name, phone, total, createdAt, date } = orderdetail;

    const history = useHistory();

    const redirectToOrderSlip = () => {
        console.log("redirecting to orderslip...");

        history.push(
            {
                pathname: '/admin/order/orderslip',
                state: {
                    details: orderdetail,
                    date: date
                }
            })

    }

    return (
        <div style={{ marginBottom: '10px' }}>


            <div style={outerStyle}>

                <div style={{ float: 'right', padding: '10px' }}>
                    <h4>Amount:<b> ₹{total}</b></h4>
                </div>
                <div style={{ float: 'right', marginRight: '20vw', padding: '10px' }}>
                    <h4>Date:{date}</h4>
                </div>

                <div onClick={redirectToOrderSlip} style={{ cursor: 'pointer', color: 'blue' }}>
                    <h4>Name</h4>
                    <h5>{name}</h5>
                </div>

                <div style={{ float: "right", marginTop: '25px', maxWidth: '50vw' }}>
                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" style={{ verticalAlign: 'middle', padding: '0px 5px' }} />
                    <label for="vehicle1" style={{ display: 'inline block', padding: '0px 10px' }}>Verified</label>
                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" style={{ verticalAlign: 'middle', padding: '0px 5px' }} />
                    <label for="vehicle1" style={{ display: 'inline block', padding: '0px 10px' }}>Dispatched</label>
                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" style={{ verticalAlign: 'middle', padding: '0px 5px' }} />
                    <label for="vehicle1" style={{ display: 'inline block', padding: '0px 10px' }}>Delivered</label>
                </div>

                <div style={{ marginTop: '10px' }}>
                    <h4>Address</h4>
                    <h5 style={{ maxWidth: '30vw' }}>{address}</h5>
                    <h5>Phone:{phone}</h5>
                </div>





            </div>
        </div>
    )
}

export default OrderPage
const outerStyle = {

    width: '100%',
    minHeight: '20vh',
    boxShadow: '0px 0px 5px 0px',
    border: '1px  solid steelblue',
    padding: '5px 10px 5px 10px',
    overFlow: 'scroll'
}
/*
        <Redirect to={{
            pathname: '/admin/order/orderslip',
            state: { details: orderdetail }
        }} />
*/