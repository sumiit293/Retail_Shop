import React, { forwardRef, useState, useImperativeHandle } from 'react'

const DescriptionModel = forwardRef((props, ref) => {

    useImperativeHandle(
        ref,
        () => {
            return {
                openModal: () => open(),
                close: () => close()
            }
        }

    )

    const [Display, setDisplay] = useState(false);


    const open = () => {
        setDisplay(true);
    }

    const close = () => {

        setDisplay(false)
    }

    return (
        Display ?
            (
                <div className="modal-wrapper">
                    <div className="modal-wrapper-backdrop" onClick={close} />
                    <div className="modal-content">
                        {props.children}
                    </div>
                </div>
            ) : null

    )
})

export default DescriptionModel
