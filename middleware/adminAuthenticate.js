const jwt = require("jsonwebtoken");
const secret = require("./../config/mysecret").secret;

module.exports = (req, res, next) => {
    const adminToken = req.header('x-adminAuth-token');

    if (!adminToken) {
        return res.status(401).json({ msg: "No token Authorization denied" })
    }

    try {
        const decoded = jwt.verify(adminToken, secret);
        req.user = decoded.user;
        console.log(decoded);
        next();

    } catch{

        res.status(401).json("Token not valid");

    }
}

