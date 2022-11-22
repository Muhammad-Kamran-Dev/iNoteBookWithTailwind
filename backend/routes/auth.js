const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require("../models/User"); // Importing Note model to perform different operations on the model
const { body, validationResult } = require("express-validator"); // To valid input of the user
var fetchUser = require('../middleware/fetchUser');
require('dotenv').config() // will load the env variables from the .env file
const SercretKey = process.env.JWT_SECRET_KEY //Read the secret key from the env variable
let success = true;
// Route:1 Create a User using: POST "/api/auth/createuser". No login required.
router.post(
    "/createuser",
    [
        body("name", "Enter a valid name").isLength({ min: 3 }),
        body("password", "password must be atleast 5 character long").isLength({
            min: 5,
        }),
    ],
    async (req, res) => {
        // if errors present then will send as response
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            success= false;
            return res.status(400).json({success, errors: errors.array() });
        }
        // check if user with the same email exists in database or not
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            success = false;
            return res.status(500).json({ success, error: "User with same email already exists" });
        }

        try {
            // Generating salt for password to generate hash of the password to make it more secure using bcryptjs 
            const salt = await bcrypt.genSalt(10);

            // Generate hash of the password using bcryptjs
            const securePassword = await bcrypt.hash(req.body.password, salt)

            // If no errors then create a user and store in database with hash of the password
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securePassword,
            });

            const data = {
                user: {
                    id: user.id,
                }
            };

            const authtoken = jwt.sign(data, SercretKey); // sign data with the secret key 
            success=true;
            res.json({ success,authtoken }); // Send the jwt authtoken which has the user id in his payload

        } catch (error) {
            success = false;
            res.status(500).json({ success, error: error.message });
        }
    }
);

// Route:2 Login a User using: POST "/api/auth/login". No login required.
router.post("/login", [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password should not be blank").notEmpty(),
], async (req, res) => {
    // if errors present then will send as response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body; // Destructuring email and password from req.body object 
    try {

        // Check whether user with the email exists in the database
        const user = await User.findOne({ email })
        if (!user) {
            success = false;
            return res.status(401).json({ success, error: "Login with Correct Credentials" });
        }

        // Compare hash of userinputpassword with hash of the password saved in the database 
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            success = false;
            return res.status(401).json({ success, error: "Login with Correct Credentials" });
        }

        // If user exists with email and password is correct then send authtoken which has user id inside as Response
        const data = {
            user: { id: user.id }
        }
        const authtoken = jwt.sign(data, SercretKey); // authtoken sign with secret key 
        success=true;
        res.json({ success, authtoken });
    }
    catch (error) {
        success = false;
        return res.status(500).json({ success, error: "Internal Server Error" });

    }
});


// Route:3 fetchUser data from database: POST "/api/auth/getuser". Login required.
router.post('/getuser', fetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json({ user });
    } catch (error) {
        success= false;
        res.status(500).json({ success, error: "Try with valid token" });
    }

});


module.exports = router;
