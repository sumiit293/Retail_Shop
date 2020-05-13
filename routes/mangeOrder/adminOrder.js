const router = require("express").Router();
const Order = require("./../../models/RetailOrder");
const adminAuth = require("./../../middleware/adminAuthenticate");
// testing the route
router.get("/", (req, res) => {
    res.json("hello word")
})

module.exports = router;

// fetching the last 40 order
router.get("/order", adminAuth, async (req, res) => {

    try {
        const order = await Order.find().sort({ createdAt: -1 });
        res.json(order);
    } catch (error) {
        console.log(error);
    }
})