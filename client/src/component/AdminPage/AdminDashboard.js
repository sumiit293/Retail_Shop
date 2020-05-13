import React, { useContext, Fragment, useEffect, useState } from 'react'
import AdminContext from './../../context/admin/adminContext';
import ProductContext from './../../context/uploadProduct/productContext'
import FormInfo from './../layout/FormInfo'
import FormUploadPhoto from './../layout/FormUploadPhoto'
import { fileExtension, Filefilter } from './../../context/utility/Filefilter'
const AdminDashboard = (props) => {


    const adminContext = useContext(AdminContext);
    const productContext = useContext(ProductContext);


    const { admin, loadAdmin, logout } = adminContext;
    const { timer, productInfoUploadedInfo, UploadProductInfo, UploadProductImage } = productContext;
    const bg = productInfoUploadedInfo === "Product added sucessfully" ? 'green' : 'red';



    // states for storing product info
    const [item, setitem] = useState({
        step: 1,
        name: '',
        category: '',
        subCategory: '',
        description: '',
        price: "",
        image: [],
        formdata: null


    });

    const { step, image } = item;

    //states for storing the product image
    const [itemImage, setImage] = useState({
        productImg: [],
        info: null

    })

    // useEffect hooks
    useEffect(() => {
        loadAdmin();
        //eslint-disable-next-line
    }, [])

    // loading the filtered image else return false

    const loadImage = (e) => {

        if (Filefilter(e.target.files) !== true) {

            setImage({
                ...itemImage,
                info: Filefilter(e.target.files)
            })
            setTimeout(() => {
                setImage({
                    ...itemImage,
                    info: null
                })
            }, 4000);

            return false;

        } else {
            // if everything goes right then populate the form data with files
            let image = [];
            let formdata = new FormData();
            let files = Array.from(e.target.files);
            for (let i = 0; i < (files).length; i++) {
                image.push(Date.now() + Math.random() * 10000 + "." + fileExtension(files[i].name));
                formdata.append("productImg", files[i], image[i]);

            }

            console.log(image);
            console.log(formdata.getAll("productImg"))
            setitem({
                ...item,
                image: image,
                formdata: formdata
            })

            return true;
        }


    }



    //getting all the product info
    const loadInfo = (e) => {
        setitem({
            ...item,
            [e.target.name]: e.target.value
        })
    }
    // if the file passes the filter
    const Next = () => {
        if (image.length > 0) {

            setitem({
                ...item,
                step: step + 1
            })
        }

    }

    // onsubmitting the form call the function from product states

    const Onsbmt = async (e) => {
        e.preventDefault();
        console.log(item.formdata.getAll("productImg"))
        UploadProductImage(item.formdata);
        UploadProductInfo(item);
        // setiing the states to preveious state
        setitem({
            step: 1,
            name: '',
            category: '',
            subCategory: '',
            description: '',
            price: "",
            image: [],
            formdata: null
        })


    }
    //function for logging out the admin
    const onClick = () => {
        logout();
        props.history.push("/admin/login");
    }


    // rendering the the uploading interfaces

    switch (step) {

        case 1:
            return (
                <Fragment>
                    <h1 style={{ marginBottom: '10px' }}>Welcome <span className="text-primary">{admin}</span><button className="btn " onClick={onClick} style={{ marginLeft: '20%', borderRadius: '5px' }}> Logout</button></h1>
                    {itemImage.info !== true && (<h4 style={{ backgroundColor: 'red', color: 'white', fontSize: '24px', textAlign: 'center' }}>{itemImage.info}</h4>)}
                    {timer === true && (<h4 style={{ backgroundColor: bg, color: 'white', fontSize: '24px', textAlign: 'center' }}>{productInfoUploadedInfo}</h4>)}
                    <FormUploadPhoto loadImage={loadImage} Next={Next} />
                </Fragment>

            )
        default:
            return (
                <Fragment>
                    <h1 style={{ marginBottom: '10px' }}>Welcome <span className="text-primary">{admin}</span><button className="btn " onClick={onClick} style={{ marginLeft: '20%', borderRadius: '5px' }}> Logout</button></h1>
                    {itemImage.info !== true & itemImage.info !== null && (<h6 className="card" style={{ backgroundColor: 'red' }}>{itemImage.info}</h6>)}
                    <FormInfo loadInfo={loadInfo} item={item} style={{ clear: 'both' }} Onsbmt={Onsbmt} />
                </Fragment>

            )



    }
}
export default AdminDashboard



