const express = require('express')
const connectDb = require('./db'); // requiring the logic to connect to the database from db file
const cors = require('cors');// to import cors
// To connect to the database
connectDb();

const app = express(); // express app
const port = 5000; // port on which server is listening

app.use(cors({
    origin: "http://localhost:3000" // to allows request from client from port 3000
}))
app.use(express.json()) // to fetch data from reques body this middleware is needed 

// All Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes.js'));


// Server is listening on port 5000
app.listen(port, () => {
    console.log(`iNoteBook app listening on port ${port}`);
});