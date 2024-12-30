const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const { _auth } = req.cookies;
    if (!_auth) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
   try {
    const decode = jwt.verify(_auth, process.env.SECRET_KEY);
    req.user = decode;
   } catch (error) {
    console.log(error);
    return res.status(401).json({
        success: false,
        message: "invalid token"
    })
   }
    return next();
}

module.exports = auth