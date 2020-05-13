import React, { Fragment, useContext, useRef, useEffect } from 'react'
import ProductItem from './productItem'
import tempCategory from './../../database/tempCategory'
import CategoryContext from '../../context/category/categoryContext'
import DescriptionModal from './DescriptionModal'
import Footer from './../home/Footer'
import maxProduct from './../../context/utility/maxProducts'
import UserAuthContext from './../../context/userAuth/userAuthContext'
import CartContext from './../../context/cart/cartContext'
import PopUpMsg from './../../context/utility/popUpMsg'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
const Products = (props) => {

    const { loadUser, isUserAuthenticated } = useContext(UserAuthContext);
    const { info } = useContext(CartContext);

    useEffect(() => {
        loadUser()
    }, [isUserAuthenticated])
    // state for updating the modal with data

    const [modal, setmodal] = React.useState({
        name: '',
        category: '',
        subCategory: '',
        description: '',
        price: ''
    })
    // state for filtering the current data
    const [filterCurrent, setfilterCurrent] = React.useState({
        value: ""
    });



    //state for storing all the products to be shoed
    const [triggerRender, settriggerRender] = React.useState(false);
    //
    const categoryContext = useContext(CategoryContext);
    // getting the category and search input for updating the comphonent
    const {
        category,
        searchInput,
        loading,
        getProductByCategory,
        getTheProductBySearchInput,
        getTheEntireProducts,
        ProductSearchResult,
        gettingTheTotalProductSearched,
        gettingTheTotalProductQueried } = categoryContext;

    const onChange = (e) => {
        setfilterCurrent({
            ...filterCurrent,
            value: e.target.value
        });

    }

    let [currentPage, setcurrentPage] = React.useState(0);



    useEffect(() => {
        //persisting the category to localstorage
        if (category != "") {
            localStorage.setItem("category", category);
            localStorage.setItem("searchInput", searchInput);
        }
        // filtering the different products on the basis of inputs and category
        if (localStorage.getItem("category") === "custom") {
            getTheProductBySearchInput(localStorage.getItem("searchInput"), currentPage * 10);


        } else if (localStorage.getItem("category") === "All") {
            getTheEntireProducts(currentPage * 10);

        }
        else {
            getProductByCategory(localStorage.getItem("category"), currentPage * 10);
        }


    }, [currentPage])


    maxProduct();
    //temp categories
    const tempcategories = tempCategory;

    //for modal 
    const description_modal_ref = useRef();



    // for opening and closing the modal
    const openModal = () => {
        description_modal_ref.current.openModal();

    };
    const closeModal = () => {
        description_modal_ref.current.close();

    };








    const fetchInfoForModal = (name, price, category, subCategory, Description) => {


        setmodal({
            name: name,
            price: price,
            category: category,
            subCategory: subCategory,
            description: Description
        })


    }
    const [filter, setfilter] = React.useState([]);

    const onGoClick = () => {
        if (filterCurrent.value) {
            const Regex = new RegExp(filterCurrent.value, 'gi');
            var filterdProductToBeDisplayed = ProductSearchResult.filter(product => product.name.match(Regex) || product.category.match(Regex))
            setfilter(filterdProductToBeDisplayed);
            settriggerRender(true);
        } else {
            settriggerRender(false);
        }
    }



    return (
        <Fragment>

            <p style={{ display: 'block', verticalAlign: 'middle' }}>Showing the results from</p>
            <h1 style={{ display: 'Block' }}>{localStorage.getItem("category")} category</h1>
            {(!loading && ProductSearchResult != undefined) && (<div>
                <input type="text" placeholder="Filter search result" value={filterCurrent.value} onChange={onChange} />
                <button className="btn btn-block" style={{ backgroundColor: 'steelblue', }} onClick={onGoClick} >{filterCurrent.value === "" && triggerRender ? "Clear Filter" : "Filter Result"}</button>
            </div>)
            }

            <TransitionGroup>
                {info && (<CSSTransition key={info + Date.now()} classNames="item" timeout={300}>
                    <center>
                        <PopUpMsg info={info} style={{ margin: "1rem auto" }} />
                    </center>
                </CSSTransition>)}
            </TransitionGroup>
            {(!loading && ProductSearchResult.length === 0) && (<h2>No Product found!</h2>)}
            <div style={{ minHeight: '440px' }}>
                {(!loading && ProductSearchResult != undefined) && (<div className="products">

                    {triggerRender !== true ? ProductSearchResult.map(product =>

                        <ProductItem key={product._id} product={product} fetchInfoForModal={fetchInfoForModal} openModal={openModal} />) :
                        filter.map(product =>
                            <ProductItem key={product._id} product={product} fetchInfoForModal={fetchInfoForModal} openModal={openModal} />
                        )}
                </div>)
                }
            </div>

            {(!loading && ProductSearchResult != undefined) && (<div className="modal">
                <DescriptionModal ref={description_modal_ref} key="1">
                    <center>
                        <h1>Product:  <span className="text-primary">{modal.name}</span></h1>
                    </center>
                    <ul className="modal hide sm">
                        <li>Category:<span className="text-primary">{modal.category}</span></li>
                        <li>Sub Category:<span className="text-primary">{modal.subCategory}</span></li>
                        <li>Price:<span className="text-primary">{modal.price}</span></li>
                    </ul>
                    <center>
                        <h3>Description:</h3>
                        <p><span className="text-primary">{modal.description}</span></p>
                    </center>
                </DescriptionModal>
            </div>)
            }

            {(!loading && ProductSearchResult != undefined) && <Footer
                currentPage={currentPage} setcurrentPage={setcurrentPage} />}

        </Fragment>

    )




}


export default Products
/*

*/