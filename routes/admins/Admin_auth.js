const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const secret = require("./../../config/mysecret").secret;
const Admin = require("./../../models/Admin");
const Jwt = require("jsonwebtoken");
const adminAuth = require("./../../middleware/adminAuthenticate");

// @route     GET api/admin/user
// @desc      Get authorized user 
// @access    Private
router.get('/', adminAuth, async (req, res) => {
    try {
        const user = await Admin.findById(req.user.id).select('-password');
        res.json(user.name);
    } catch (error) {
        console.log(error)
        res.status(500).json('Server error');
    }
});
router.get('/prt', adminAuth, async (req, res) => {
    return res.json("this is protected routes");
});
// @route api/auth
// @desc POST 
// @ Public
router.post("/", [
    check('phone', 'Enter the valid Phone Number').isMobilePhone('en-IN'),
    check('password', 'Email can\'t be isEmpty').exists()
], async (req, res) => {



    const err = validationResult(req);
    if (!err.isEmpty()) {
        console.log(err.array()[0].msg);
        return res.status(400).json(err.array()[0].msg);
    }
    const { phone, password } = req.body;
    try {

        const admin = await Admin.findOne({ phone });
        // checking if the user exists
        if (!admin) {
            return res.status(400).json("This phone in not registered");
        }
        // comparing the password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json("Invalid Credentials")
        }
        const payload = {
            user: {
                id: admin.id
            }

        }
        // generating the token

        const token = await Jwt.sign(payload, secret, {
            expiresIn: '3h'
        })

        return res.json(token);
    } catch (error) {
        console.log(error);
        res.json("Internal server error");
    }

})

module.exports = router;