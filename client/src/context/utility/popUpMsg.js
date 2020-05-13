import React, { useEffect, Fragment } from "react"


const PopUpMsg = ({ info }) => {

    return (
        <Fragment>
            <center>
                <div id="popupmsg" style={style}>
                    <p style={styleP}>{info}</p>
                </div>
            </center>
        </Fragment>
    )
}

export default PopUpMsg

const style = {

    position: 'fixed',
    top: '100px',
    backgroundColor: 'rgba(0,0,0,.8)',
    left: '50%',
    transform: 'translateX(-50%)',
    borderRadius: '5px',
    width: '60%',
    zIndex: '100'

}
const styleP = {

    color: 'white',
    padding: '10px',
    fontSize: 'large',
    textAlign: 'center'
}