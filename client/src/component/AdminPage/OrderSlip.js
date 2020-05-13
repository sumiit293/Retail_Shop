import React, { Fragment, useContext } from 'react'
import ProductList from './ProductList'
const OrderSlip = (props) => {

    const { phone, address, name, total, order, createdAt } = props.location.state.details
    let date = createdAt.split("T");
    date = date[0];
    var serialNo = 1;

    return (


        <div style={{ marginBottom: '30px' }}>


            <div style={{ paddingTop: '10px' }}><h2>Order detail</h2></div>
            <div style={outerStyle}>

                <div style={{ float: 'right', padding: '10px' }}>
                    <h4>Amount:<b> ₹{total}</b></h4>
                </div>
                <div style={{ float: 'right', marginRight: '20vw', padding: '10px' }}>
                    <h4>Date:{date}</h4>
                </div>

                <div>
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

            {order.map((product) => { return (<ProductList key={product._Id} product={product} serialNo={serialNo++} />) })}

        </div>
    )
}

export default OrderSlip

const outerStyle = {

    width: '100%',
    minHeight: '20vh',

    marginTop: '100px',
    padding: '5px 10px 5px 10px',
    overFlow: 'scroll',
    borderBottom: '1px solid steelblue'
}
/*

            */