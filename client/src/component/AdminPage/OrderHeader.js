import React, { Fragment } from 'react'

const OrderHeader = () => {
    return (
        <Fragment>
            <div style={header}>
                <div>
                    <input type="text" name="search-orders" placeholder="Search Your Order" style={innerUnit} />
                </div>
                <div>
                    <select style={innerUnit}>
                        <option value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                        <option value="custom">Custom Date</option>
                    </select>
                </div>
                <div>
                    <select style={innerUnit}>
                        <option>Most Recent</option>
                        <option>Verified</option>
                        <option>Dispatched</option>
                        <option>Delivered</option>
                    </select>
                </div>
                <div>
                    <button className="btn btn-primary" style={{ borderRadius: '10px' }}>Search</button>
                </div>


            </div>


        </Fragment>
    )
}

export default OrderHeader
const header = {
    display: "flex",
    flexFlow: 'coloumn wrap',
    border: '1px solid steelblue',
    alignItems: 'center',
    justifyContent: "space-evenly",
    marginTop: '50px',
    marginBottom: '100px',
    backgroundColor: 'rgba(0,0,255,0.3)'

}

const innerUnit = {
    marginTop: '0.6rem',
    borderRadius: '10px',
    border: '1px solid red',
    paddingLeft: '10px'
}