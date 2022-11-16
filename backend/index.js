const express = require('express')
const connectDb = require('./db'); // requiring the logic to connect to the database from db file

// To connect to the database
connectDb();

const app = express(); // express app
const port = 3000; // port on which server is listening

// To make a seperate routes for each of them 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes.js'));


// server is listening on port 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});