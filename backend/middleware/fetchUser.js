const jwt = require('jsonwebtoken');
require('dotenv').config() // will load the env variables from the .env file
const SercretKey = process.env.JWT_SECRET_KEY //Read the secret key from the env variable


const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: "Try with correct token" });
    }
    try {
        const data = jwt.verify(token, SercretKey);
        if (!data) {
            return res.status(401).json({ error: "Try with valid token" });
        }
        req.user = data.user; 
        next();
    } catch (error) {
        return res.status(500).json({ Error: "Try with valid token" });
    }
}


module.exports = fetchUser;
