const jwt = require('jsonwebtoken');
const config = process.env;
const verifyToken = async (req, res, next) => {
    const token = req.body.token || req.query.token;

    if(!token){
        res.status(403).send("Token not received");
    }

    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;

    }catch(err) {
        console.log(err);
        res.status(201).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;