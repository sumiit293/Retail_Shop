import React, { Fragment, useState } from 'react'
import tempCategory from './../../database/tempCategory'
const FormInfo = (props) => {
    const { loadInfo, item, Onsbmt } = props;
    const catTempArray = tempCategory;

    let [setcurrentCategory] = useState("");
    const [currentSubCategories, setcurrentSubCategory] = useState("");
    const setCat = (e) => {
        setcurrentCategory = (e.target.value);
        const subCategoriesExist = catTempArray.filter(cat => cat.name === e.target.value)[0].subCategory;
        if (subCategoriesExist != undefined) {
            setcurrentSubCategory(subCategoriesExist);
        }
    }
    // getting the index of current category
    // const getIndexOfCurrentCategory = (currentCategory) => {
    //     for (let i = 0; i < catTempArray.length; i++) {
    //         if (catTempArray === currentCategory) {
    //             console.log(i);
    //             return i;

    //         }
    //     }
    // }

    return (
        <Fragment>
            <div className="card" style={{ marginLeft: 'auto', marginRight: 'auto', borderRadius: '5px' }}>
                <h1 style={{ borderBottom: '2px solid blue', marginBottom: '50px' }}>Add <span className="text-primary text-center">Item</span></h1>
                <label htmlFor="Name">Item's Name</label>
                <input type="text" placeholder="Name" name="name" defaultValue={item.name} required onChange={loadInfo} />
                <label htmlFor="Category">Category</label><br />
                <select name="category" onChange={loadInfo} onBlur={setCat}>
                    {tempCategory.map(cat1 => (<option value={cat1.name}>{cat1.name}</option>))}
                </select>
                <label htmlFor="subCategory"> Sub-category</label><br />
                <select name="subCategory" onChange={loadInfo}>
                    {currentSubCategories.length !== 0 ? currentSubCategories.map(subCategory => (<option value={subCategory}>{subCategory}</option>)) : <option>None</option>}
                </select>
                <label htmlFor="price">Item's Price</label>
                <input type="text" placeholder="Price" name="price" defaultValue={item.price} onChange={loadInfo} required />
                <label htmlFor="productDescription">Product Description</label>
                <textarea id="productDescription" rows="3" name="description" required placeholder="Desccribe your products" maxLength
                    ="250" defaultValue={item.description} onChange={loadInfo} >
                </textarea>

            </div>
            <button className="btn btn-primary" onClick={Onsbmt} style={{ float: 'right', marginBottom: '10px' }}>Upload Info</button>
        </Fragment>
    )
}

export default FormInfo
