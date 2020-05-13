const mongoose = require("mongoose");
const Admin = require("./../../models/Admin");
const router = require("express").Router();
const secret = require("./../../config/mysecret").secret
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");




// @route     post api/admin
// @desc      Register the user
// @access    Public

router.post("/", [
    check('name', 'Nmae is required').exists(),
    check('email', 'Please include a valid email').isEmail(),
    check('phone', 'Please enter a valid mobile number').isMobilePhone('en-IN'),
    check('password', 'Password must be at least 6 digit').isLength({ min: 6 }),
], async (req, res) => {

    const err = validationResult(req);
    if (!err.isEmpty()) {
        returnres.status(400).json({ msg: err })
    }
    let { name, password, email, phone } = req.body;



    // checking if phone is registered
    try {
        let registered = await Admin.findOne({ phone });
        if (registered) {
            return res.status(400).json({ msg: "Admin is allready registered" });
        }
        const newAdmin = new Admin(
            {
                name,
                email,
                phone,
                password,

            });


        // hashing the password

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        newAdmin.password = hash;

        // saving the user to database

        await newAdmin.save();

        let payload = {
            user: {
                id: newAdmin.id
            }
        }
        //creating the tokens
        jwt.sign(payload, secret, {
            expiresIn: '3h'
        }, (err, token) => {
            if (err) {
                return res.status(500).json({ msg: err })
            }
            return res.json(token)
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error });
    }


})


module.exports = router;