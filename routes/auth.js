const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const secret = require("./../config/mysecret").secret;
const User = require("./../models/User");
const Jwt = require("jsonwebtoken");
const auth = require("./../middleware/authenticate");

// @route     GET api/auth
// @desc      Get authorized user 
// @access    Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.log(error.response.data)
        res.status(500).json('Server error');
    }
});
//for testing purpos
router.get('/prt', auth, async (req, res) => {
    return res.json("this is protected routes");
});
// @route api/auth
// @desc POST 
// @ Public
router.post("/", [
    check('phone', 'Enter the valid Phone Number').isMobilePhone('en-IN'),
    check('password', 'Password can\'t be isEmpty').exists()
], async (req, res) => {

    const err = validationResult(req);
    if (!err.isEmpty()) {
        console.log(err.array()[0].msg);
        return res.status(400).json(err.errors[0].msg)

    }
    const { password, phone, } = req.body;

    try {

        const user = await User.findOne({ phone });

        // checking if the user exists
        if (!user) {
            return res.status(400).json("This phone in not registered");

        }
        // comparing the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json("Invalid Credentials")

        }
        const payload = {
            user: {
                id: user.id
            }

        }
        // generating the token

        try {
            const token = await Jwt.sign(payload, secret, {
                expiresIn: '3h'
            })
            return res.json({ msg: token });
        } catch (err) {
            res.sataus(500).json({ error: err })
        }


    } catch (error) {
        console.log(error.response.data);
        res.status(500).json(error);
    }

})

module.exports = router;