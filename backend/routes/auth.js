const express = require("express");
const router = express.Router();

// after route localhost/3000/api/auth/ will catch all requests here
router.get("/", (req, res) => {

    //just for testing 
    const User = {
        name: "abc",
        Email: "abc@example.com",
        Date: Date.now(),
    };
    res.json({ User: User, Working: "Good" });
});

// api/auth/logout
router.get("/logout", (req, res) => {
    res.json({ logout: "logout" });
});

// api/auth/login
router.get("/login", (req, res) => {
    res.json({ login: "login" });
});

// api/auth/signup
router.get("/signup", (req, res) => {
    res.json({ signup: "signup" });
});

module.exports = router;
