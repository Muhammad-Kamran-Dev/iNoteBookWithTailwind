const express = require('express');
const router = express.Router();

// after route localhost/3000/api/note/ will catch all requests here
router.get('/', (req, res) => {
    res.json({ Notes: [] })
});

module.exports = router;