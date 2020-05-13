import React, { Fragment, useState } from 'react'


const Header = (props) => {

    const { customSearch, redirect } = props;
    //storing the value of input to be serched
    let [state, setstate] = useState("")

    const onChange = (e) => {
        setstate(
            e.target.value
        )
    }
    //putting the value of state to global state searchInput

    const onSubmit = () => {
        if (state !== "") {
            customSearch(state);
            redirect();
        }

    }
    return (
        <Fragment>
            <div className="header" style={style}>
                <div className="sub-header">
                    <div className="header-content">
                        <center>
                            <h2>Shop right from your home!</h2>
                            <input type="text" placeholder="Search your product" value={state} onChange={onChange} />
                            <button className="btn btn-small" onClick={onSubmit}>Go</button>
                        </center>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
const bg = process.env.PUBLIC_URL + "/home/Home8.jpg";
const style = {
    backgroundImage: `url(${bg})`,


}


export default Header
