import React, { Fragment } from 'react'

const FormUploadPhoto = (props) => {




    const { loadImage, Next } = props;
    return (
        <Fragment>
            <div className="card" style={{ width: '60vw', marginLeft: 'auto', marginRight: 'auto', clear: 'both', marginTop: '50px' }}>
                <h1 style={{ borderBottom: '2px solid blue', textAlign: 'center' }}>Add <span className="text-primary"> product's photo</span></h1>
                <div style={{ marginTop: '5%' }}>
                    <h3>Select the image file to be uploaded</h3>
                </div>
                <center>
                    <input type="file" id="inputImg" name="image" multiple className="btn btn-primary" style={{
                        width: '60%', marginLeft: '-1px', borderRadius: '20px',
                    }}
                        onChange={loadImage} />
                </center>

                <input type="submit" className="btn  btn-primary " value="Next" style={{ float: 'right', marginTop: '25px', borderRadius: '5px' }} onClick={Next} />

            </div>
        </Fragment>
    )
}

export default FormUploadPhoto
