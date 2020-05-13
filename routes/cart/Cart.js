const express = require("express");
const router = express.Router();
const auth = require("./../../middleware/authenticate");
const Cart = require("./../../models/Cart");
const Order = require("./../../models/RetailOrder");


// api/cart/count/items
// @desc counting the total no of items in cart
// PRIVATE
router.get("/count/items", auth, async (req, res) => {

    try { // Checking if the user has cart
        var caart = await Cart.findOne({ name: req.user.id });

        if (!caart) {
            console.log("No cart found")
            return res.json(Number(0));
        }

        let { cart } = caart;
        var count = 0;
        cart.map((product => (count++)));


        return res.json(Number(count));

    } catch (err) {
        console.log(err)
        if (res.status) {
            return res.status;
        }
    }

})
// api/cart/cartinfo
// @desc getting all items in cart
// PRIVATE
router.get("/cartinfo", auth, async (req, res) => {

    try {

        const caart = await Cart.findOne({ name: req.user.id });
        if (!caart) {
            return res.status(404).json("Cart is empty");
        }

        // Grabbing the list of all product in cart
        let { cart } = caart;
        return res.json(cart)


    } catch (error) {
        console.log(error)
        return res.json(error);
    }
})

// api/cart
// @desc adding the item to cart
// PRIVATE

router.post("/", auth, async (req, res) => {

    //checking if the user has cart

    var cart = await Cart.findOne({ name: req.user.id });

    //if not create a cart for him
    if (!cart) {

        const nwCart = new Cart();
        nwCart.name = req.user.id;
        await nwCart.save();
        console.log(Date.now());
    }

    // database stuff
    try {

        const newCart = await Cart.findOne({ name: req.user.id });

        // extracting the product from req ,to add to cart
        const Product = {
            productName: req.body.name,
            productId: req.body._id,
            productCategory: req.body.category,
            productPrice: req.body.price
        };

        // checking if the product is allready in the cart


        if (newCart.cart.length !== 0) {
            var allredayAvailable = false;
            for (let I = 0; I < newCart.cart.length; I++) {
                if (newCart.cart[I].productId == Product.productId) {
                    allredayAvailable = true
                    break;
                }

            }

            if (allredayAvailable) {
                res.json({ msg: "All ready in cart" });
                return;
            }
        }

        // if new product saving to cart database
        await newCart.cart.unshift(Product);
        await newCart.save();
        res.json({ msg: "Product added to cart" });
    } catch (err) {
        console.log("error in adding to cart", err)
        res.json({ error: "couldn't add to cart for now" })
    }
})
// api/cart/remove/:productId
// @desc adding the item to cart
// PRIVATE
router.delete("/remove/:productId", auth, async (req, res) => {


    try {

        var newCart = await Cart.findOne({ name: req.user.id });
        if (!newCart) {
            res.json("No item in cart");
            return;
        }

        newCart.cart = newCart.cart.filter((product => (product.productId !== req.params.productId)));
        await newCart.save();
        res.json({ msg: "Removed from cart" });
    } catch (err) {
        res.json({ error: err })
    }
})
router.delete("/clear", auth, async (req, res) => {


    try {

        var newCart = await Cart.findOne({ name: req.user.id });
        if (!newCart) {
            res.json("No item in cart");
            return;
        }

        newCart.cart = [];
        await newCart.save();
        res.json({ msg: "Cart Cleared" });
    } catch (err) {
        res.json({ error: err })
    }
})
//api/order
// @desc placing the order
//Private
router.post("/order", auth, async (req, res) => {

    try {

        const products = req.body.productList;
        const customer_address = req.body.address;
        const customer_phone = req.body.phone;
        const total_amount = req.body.totalSum;
        const username = req.body.name;
        await Order.insertMany([{
            order: products,
            address: customer_address,
            phone: customer_phone,
            total: total_amount,
            name: username
        }])
        res.json("Order success");
    } catch (error) {
        console.log(error);
        if (error.response) {
            res.json(error.response + "can make order now")
        }
    }
})


module.exports = router;