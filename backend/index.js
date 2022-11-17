const express = require('express')
const connectDb = require('./db'); // requiring the logic to connect to the database from db file

// To connect to the database
connectDb();
 
const app = express(); // express app
const port = 3000; // port on which server is listening

app.use(express.json()) // to fetch data from reques body this middleware is needed 

// All available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes.js'));


// Server is listening on port 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});