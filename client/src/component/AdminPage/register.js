import React, { Fragment, useState, useContext, useEffect } from 'react';
import adminContext from './../../context/admin/adminContext'
import Spinner from './../spinner/Spinner'
const Register = (props) => {

    const adminAuthContext = useContext(adminContext);

    let { register, isAdminAuthenticated, error } = adminAuthContext;

    useEffect(() => {
        if (isAdminAuthenticated) {
            props.history.push("/admin/dashboard");
        }
        return setLoader(false)


    }, [isAdminAuthenticated])

    const [regState, setregState] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
    let [loader, setLoader] = useState(false);
    const onChange = (e) => {
        setregState({ ...regState, [e.target.name]: e.target.value })
    }
    const { name, phone, email, password } = regState;
    const onSubmit = (e) => {
        e.preventDefault();
        setLoader(true);

        setTimeout(() => {
            register({
                name,
                email,
                phone,
                password
            })
        }, 2000);

    }
    return (
        <Fragment>
            <h2 style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '50px' }}> Admin <span className="text-primary"> Registration </span></h2>

            <form onSubmit={onSubmit} style={{ width: '60%', marginLeft: 'auto', marginRight: 'auto', marginTop: '10px' }}>
                {error && <p style={{ width: '100%', textAlign: 'center', font: '24px', padding: '0.4em', backgroundColor: 'red' }}>{error}</p>}

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" placeholder="Name" value={regState.name} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" name="phone" placeholder="Phone" required value={regState.phone} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" placeholder="Email" value={regState.email} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" placeholder="Password" required value={regState.password} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input type="text" name="confirmPassword" placeholder="Confirm Password" value={regState.confirmPassword} onChange={onChange} required />
                </div>


                <input type="submit" value="Register" className="btn btn-block btn-primary" />
            </form>

            {loader && (<Spinner />)}
        </Fragment>
    )
}

export default Register
