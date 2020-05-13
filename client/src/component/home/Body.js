import React, { useContext, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import categoryContext from './../../context/category/categoryContext'
import tempCategory from './../../database/tempCategory'
const Body = (props) => {


    const { setCategory } = useContext(categoryContext);


    const history = useHistory();
    const categories = tempCategory;
    const setcurrentcategory = (e) => {

        setCategory(e.target.id);
        history.push("/products");

    }


    const path1 = `${process.env.PUBLIC_URL}/upload/productPhotos/`;

    return (
        <Fragment>
            <section className="my-1">
                <div className="grid-3">
                    {categories.map((category) => (
                        <div className={`secUnits`} key={category.title} id={category.name} onClick={setcurrentcategory}>
                            <img src={path1 + category.image} id={category.name} />
                            <h2 id={category.name}>{category.title}</h2>
                        </div>
                    ))}

                </div>
            </section>
        </Fragment>
    )
}


export default Body
