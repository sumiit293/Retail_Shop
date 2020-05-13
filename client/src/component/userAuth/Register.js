import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import UserAuthContext from './../../context/userAuth/userAuthContext'
const Register = (props) => {

    const userAuthContext = useContext(UserAuthContext);

    const { register, isUserAuthenticated, error } = userAuthContext;
    const [registerState, setRegisterState] = useState({})



    useEffect(() => {
        if (isUserAuthenticated) {
            console.log("isAdminAuthenticated->" + isUserAuthenticated)
            props.history.push("/");

        }

    }, [isUserAuthenticated, props.history]);

    const onChange = (e) => {
        setRegisterState({
            ...registerState,
            [e.target.name]: e.target.value
        })
    }


    const onSubmit = (e) => {
        e.preventDefault();
        const { name, phone, email, password, address } = registerState;
        register({ name, phone, email, password, address });
    }


    return (
        <Fragment>

            {error && <p className="center" style={style1}>{error} </p>}
            <div style={{ marginLeft: 'auto', marginRight: 'auto' }} className="small-device">
                <h2>User <span className="text-primary">Registration</span></h2>
                <form onSubmit={onSubmit} style={style}>
                    <div className='form-group'>
                        <label>Name</label>
                        <input type='text' name='name' placeholder='Enter Name' required value={registerState.name} onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <label>Phone</label>
                        <input type='text' name='phone' placeholder='Enter Phone' required value={registerState.phone} onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <label>Email</label>
                        <input type='text' name='email' placeholder="Enter Email" required value={registerState.email} onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <label>Address</label>
                        <input type='text' name='address' placeholder='Your delivery address' required value={registerState.address} onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input type='password' name='password' placeholder='Enter Password' value={registerState.password} onChange={onChange} />
                    </div>
                    <input type='submit' value='Register' className="btn btn-block btn-primary" />
                </form>
                <p>Allready having account? <Link to="/user/login">Login</Link></p>
            </div>

        </Fragment>
    )
}

export default Register
const style = {

    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: '10px',
    borderRadius: '5px',

}
const style1 = {
    backgroundColor: 'red',
    color: 'white',
    marginTop: '50px',
    textAlign: 'center',
    padding: '5px'
}
