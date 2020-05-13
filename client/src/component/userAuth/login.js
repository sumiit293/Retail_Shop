import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import UserAuthContext from './../../context/userAuth/userAuthContext'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import PopUpMsg from './../../context/utility/popUpMsg'
import Spinner from './../spinner/Spinner'
const Login = (props) => {

    const userAuthContext = useContext(UserAuthContext);
    let [loader, setLoader] = useState(false);
    var { login, isUserAuthenticated, loadUser, error, userLoading } = userAuthContext;
    const [loginState, setLoginState] = useState({
        phone: "",
        password: "",

    });


    useEffect(() => {
        if (isUserAuthenticated) {
            props.history.push("/");
        }
        if (error) {
            setTimeout(() => {
                error = null
            }, 3000)
        }
        return setLoader(
            false
        )

    }, [isUserAuthenticated, error])


    const onChange = (e) => {
        setLoginState({
            ...loginState,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {

        e.preventDefault();
        setLoader(true);
        const { phone, password } = loginState;
        console.log(loginState);

        login({ phone, password });




    }
    return (
        <Fragment>

            <TransitionGroup>
                {error && (<CSSTransition key={error + Date.now()} classNames="item" timeout={300}>
                    <center>
                        <PopUpMsg info={error} style={{ margin: "1rem auto" }} />
                    </center>
                </CSSTransition>)}
            </TransitionGroup>
            <div style={{ marginLeft: 'auto', marginRight: 'auto' }} className="small-device">
                <h2>User <span className="text-primary">Login</span></h2>
                <form style={style} onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label>Phone</label>
                        <input type='text' name='phone' required placeholder='Enter Phone' value={loginState.phone} onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input type='password' name='password' required placeholder='Enter Password' value={loginState.password} onChange={onChange} />
                    </div>
                    <input type='submit' value='login' className="btn btn-block btn-primary" />
                </form>
                <p>Not having account? <Link to="/user/register">Register now</Link></p>
            </div>
            <center>
                <div style={{ padding: '20px', backgroundColor: 'rgba(125,253,100,0.6)', color: 'green', opacity: '0.5' }}>
                    <h2>Sample login</h2>
                    <h3>phone:8578814456</h3>
                    <h3>Password:1234567</h3>
                </div>
            </center>
            {loader && <Spinner />}
        </Fragment>
    )
}


export default Login;
const style = {
    border: '1px solid steelblue',
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