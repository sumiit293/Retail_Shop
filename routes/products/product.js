const mongoose = require("mongoose");
const Product = require("./../../models/Product");
const router = require("express").Router();
const { check, validationResult } = require("express-validator");


// @ type POST api/product
// @ desc routes for adding products
// @ access Only admin Can access
router.post("/", [
    check('name', 'Name is required').exists(),
    check('category', 'category is required').exists(),
    check('description', 'Description must be given').exists(),

], async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        console.log(err.array()[0].msg);
        return res.status(400).json({ msg: err.array()[0].msg })
    }

    try {
        const { category, subCategory, name, description, image, price } = req.body;
        const newProduct = new Product({
            category,
            subCategory,
            name,
            description,
            image,
            price
        })

        await newProduct.save();

        res.json("Product added sucessfully");


    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Could not add item to the database" });
    }
})
// @ type POST api/product
// @ desc routes for updating products
// @ access Only admin Can access
router.put("/:id", [
    check('name', 'Name is required').exists(),
    check('category', 'category is required').exists(),
    check('description', 'Description must be given').exists(),
    check('price', 'Should be given in Number').isNumeric(),
], async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        console.log(err.array()[0].msg);
        return res.status(400).json({ msg: err.array()[0].msg })
    }
    const { category, subCategory, name, description, image, price } = req.body;
    let productField = {};
    if (category) productField.category = category;
    if (subCategory) productField.subCategory = subCategory;
    if (name) productField.name = name;
    if (description) productField.description = description;
    if (price) productField.price = price;
    if (image) productField.image = image;

    try {
        let product = await Product.findById(req.params.id, {
            useFindAndModify: false
        });
        // later for deleting the previous photo from the database
        const original_photo = product.image;
        if (!product) {
            return res.json({ msg: "Something went wrong can't delete now" });
        }

        product = await Product.findByIdAndUpdate(req.params.id,
            { $set: productField },
            { new: true });

        res.json(product);

    } catch (error) {

        console.log(error);
        return res.json({ msg: "some thing went wrong can't update now" });
    }
})

// @ type POST api/product
// @ desc routes for deleting products
// @ access Only admin Can access
router.delete("/:id", async (req, res) => {


    try {
        await Product.findByIdAndRemove(req.params.id)
        return res.json("Deleted successfully");

    } catch (error) {
        console.log(error);
        return res.json({ msg: "some thing went wrong can't delete now" });
    }
})

// @ type get api/product
// @ desc routes for getting products bases on category
// @ access public 
router.get("/:skip", async (req, res) => {
    try {
        const allProducts = await Product.find({}).skip(Number(req.params.skip)).limit(Number(10));
        res.json(allProducts);
    } catch (error) {
        console.log("something went wrong" + error);
    }
})
// @ type get api/product
// @ desc routes for getting products bases on category
// @ access public 
router.get('/:category/:skip', async (req, res) => {
    try {
        const response = await Product.find({ category: req.params.category }).skip(parseInt(req.params.skip)).limit(Number(10));
        res.json(response);
    } catch (error) {
        console.log("something went wrong" + error);
    }
})
// @ type get api/product
// @ desc routes for getting products bases on category
// @ access public 
router.get('/search/:query/:skip', async (req, res) => {
    try {
        const response = await Product.find({ $or: [{ name: { $regex: req.params.query, $options: 'i' } }, { category: { $regex: req.params.query, $options: 'i' } }] })
            .skip(Number(req.params.skip)).limit(Number(10));
        res.json(response);
    } catch (error) {
        console.log("something went wrong" + error);
    }
})
// @ type get api/product/length
// @ desc routes for getting products  total bases on category
// @ access public
router.get('/totalProduct/category/from/:category', async (req, res) => {

    try {
        const response = await Product.find({ category: req.params.category }).countDocuments();
        res.json(response);
    } catch (error) {
        console.log("something went wrong" + error);
    }




})
// @ type get api/product/length
// @ desc routes for getting products total bases on serach query
// @ access public
router.get('/length/search/:query', async (req, res) => {
    try {
        const response = await Product.find({ $or: [{ name: { $regex: req.params.query, $options: 'i' } }, { category: { $regex: req.params.query, $options: 'i' } }] }).countDocuments()

        res.json(response);
    } catch (error) {
        console.log("something went wrong" + error);
    }
})

// counting the total product in databse 
router.get("/totalProduct/category/ALL", async (req, res) => {

    try {

        const count = await Product.find().countDocuments()
        console.log(count);
        res.json(count);

    } catch (error) {
        res.json(error)
    }


})
module.exports = router;