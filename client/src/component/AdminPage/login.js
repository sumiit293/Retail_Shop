import React, { Fragment, useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import AdminContext from './../../context/admin/adminContext';
import Soinner from './../spinner/Spinner'
import Spinner from './../spinner/Spinner';



const Login = (props) => {

    const adminContext = useContext(AdminContext);


    let { login, error, isAdminAuthenticated, loading } = adminContext;
    let [loadSpinner, setLoadSpinner] = useState(false)

    useEffect(() => {
        if (isAdminAuthenticated) {
            console.log("isAdminAuthenticated->" + isAdminAuthenticated)
            props.history.push("/admin/dashboard");

        }

    }, [isAdminAuthenticated, props.history]);
    const [loginState, setloginState] = useState({
        phone: "",
        password: "",

    });

    const onChange = (e) => {

        setloginState({
            ...loginState,
            [e.target.name]: e.target.value
        })
    }
    const { phone, password } = loginState;
    const onSubmit = (e) => {
        e.preventDefault();
        setLoadSpinner(true)
        login({ phone, password });
        setloginState({
            ...loginState,
            phone: '',
            password: ''
        });

    }








    return (
        <Fragment>
            <div style={{ marginTop: '50px' }}>
                <h2> Admin <span className="text-primary">Login</span></h2>

                <form onSubmit={onSubmit} style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', marginTop: '10px' }}>
                    {error && <p style={{ width: '100%', textAlign: 'center', fontSize: '16px', msTransitionDuration: '1s', padding: '0.8em', backgroundColor: 'red' }}>{error}</p>}

                    <label htmlFor="phone"><span>Phone</span></label>
                    <input type="text" name="phone" placeholder="Phone" value={loginState.phone} onChange={onChange} />
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" placeholder="Password" value={loginState.password} onChange={onChange} />

                    <input type="submit" value="Login" className="btn btn-block btn-primary" />
                    <p style={{ color: 'blue' }}><Link to="/admin/register">Register as Admin</Link></p>
                </form>

            </div>
            <center>
                <div style={{ padding: '20px', backgroundColor: 'rgba(125,253,100,0.6)', color: 'green', opacity: '0.5' }}>
                    <h2>Sample login</h2>
                    <h3>phone:8578814455</h3>
                    <h3>Password:1234567</h3>
                </div>
            </center>
            {(loadSpinner && loading) && <Spinner />}
        </Fragment>
    )
}

export default Login
