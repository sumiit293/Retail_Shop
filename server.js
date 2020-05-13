const express = require("express");
const db = require("./config/myurl");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

// middleware fro parsing form value
app.use(express.json({ extended: false }));

// connecting the database
const connectDB = require("./config/connectdb");
connectDB(db.host);


// admin routes
const admin_user = require("./routes/admins/Admin_user");
app.use("/api/admin/user", admin_user);
// admin routes
const admin_auth = require("./routes/admins/Admin_auth");
app.use("/api/admin/auth", admin_auth);

// user routes
const user = require("./routes/user");
app.use("/api/user", user);
// auth routes
const auth = require("./routes/auth");
app.use("/api/auth", auth);

// upload img routes
const upload = require("./routes/files_image/upload");
app.use('/api/img', upload);
// product route
const product = require("./routes/products/product");
app.use("/api/product", product);
//cart
const cart = require("./routes/cart/Cart");
app.use("/api/cart", cart)
// order
const Order = require("./routes/mangeOrder/adminOrder");
app.use("/api/order", Order);
//server static asseets in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('/client/build'));
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, '/client', '/build', '/index.html'))
    })
}
app.listen(port, () => { console.log("server is running at " + port) })