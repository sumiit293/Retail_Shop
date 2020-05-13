const router = require("express").Router();
const multer = require("multer");
const path = require('path');
const adminAuth = require("./../../middleware/adminAuthenticate");


//-var upload = multer({ dest: '/../upload/productPhotos' });
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + "./../../client/public/upload/productPhotos")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })

router.post("/", adminAuth, upload.array("productImg", 3), (req, res) => {
    res.json(req.files);
})


module.exports = router;