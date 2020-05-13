const mongoose = require("mongoose");
const User = require("../models/User");
const router = require("express").Router();
const secret = require("../config/mysecret").secret
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");




// @route     post api/user
// @desc      Register the user
// @access    Public

router.post("/", [
    check('name', 'Name is required').exists(),
    check('email', 'Please include a valid email').isEmail(),
    check('phone', 'Please enter a valid mobile number').isMobilePhone('en-IN'),
    check('address', 'Address must not be empty').exists(),
    check('password', 'Password must be at least 6 digit').isLength({ min: 6 }),
], async (req, res) => {

    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.json({ error: err.errors[0].msg })
        return;
    }
    let { name, password, email, otp, phone, address } = req.body;



    // checking if phone is registered
    try {
        let registered = await User.findOne({ phone });
        if (registered) {
            res.json({ error: "Phone is allready registered" });
            return;
        }
        const newUser = new User(
            {
                name,
                email,
                phone,
                password,
                address,
                otp
            });


        // hashing the password

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        newUser.password = hash;

        // saving the user to database

        await newUser.save();

        let payload = {
            user: {
                id: newUser.id
            }
        }
        //creating the tokens
        jwt.sign(payload, secret, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                res.json({ error: err })
                return;
            }
            return res.json({ msg: token })
        })

    } catch (error) {
        console.log(error);
        return res.json({ error: error });
    }


})


module.exports = router;