const jwt = require("jsonwebtoken");
const secret = require("./../config/mysecret").secret;

module.exports = (req, res, next) => {
    const token = req.header('x-authUser-token');

    if (!token) {
        return res.status(401).json({ msg: "No token Authorization denied" })
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded.user;

        next();

    } catch{

        res.status(401).json({ msg: "Token not valid" });

    }
}