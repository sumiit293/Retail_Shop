import React, { Fragment } from 'react'
import spinner from './spinner.gif'
const Spinner = () => {
    return (
        <Fragment>
            <div style={outer}>
                <img
                    src={spinner}
                    style={{
                        display: 'block',
                        backgroundColor: 'black',
                        width: '200px',
                        border: '1px solid black',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)'

                    }}
                />
            </div>
        </Fragment>
    )
}

export default Spinner
const outer = {
    width: '100%',
    height: '100%',
    zIndex: '1000',
    opacity: '0.6',
    backgroundColor: 'black',
    zIndex: '50',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
}