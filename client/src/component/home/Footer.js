import React, { useContext } from 'react'
import CategoryContext from '../../context/category/categoryContext'
const Footer = ({ setcurrentPage, currentPage }) => {

    const categoryContext = useContext(CategoryContext);







    const previousPage = () => {

        console.log("currentPage has been called");
        if (currentPage !== 0) {
            setcurrentPage(--currentPage);
        }
    }
    const nextPage = () => {
        const maxProduct = parseInt(localStorage.getItem("maxProduct"), 10);
        const maxpage = Math.ceil(maxProduct / 10);
        console.log("Clicked on next button");
        console.log(maxProduct);
        console.log(maxpage - 1);
        if (currentPage < maxpage - 1) {
            console.log("nextPage has been called" + currentPage);
            setcurrentPage(++currentPage);
        }


    }
    const firstPage = () => {
        const maxProduct = parseInt(localStorage.getItem("maxProduct"), 10);
        const maxpage = Math.ceil(maxProduct / 10);
        if (currentPage <= maxpage) {
            console.log("firstPage has been called");
            setcurrentPage(0);
        }

    }

    return (
        <div>
            <ul style={footer}>
                <li style={footerunit} onClick={firstPage}>1st page</li>
                <li style={footerunit} onClick={previousPage}>Previous page</li>
                <li style={footerunit} onClick={nextPage}>Next page</li>
            </ul>
        </div>
    )
}
const footer = {
    width: '100%',
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-evenly',
    marginBottom: '20px',
    backgroundColor: 'rgba(0,0,0,0.25)',
    padding: '5px'

}
const footerunit = {
    display: 'block',
    padding: '5px',
    backgroundColor: 'steelBlue',
    color: 'white',
    cursor: 'pointer',

}
export default Footer
