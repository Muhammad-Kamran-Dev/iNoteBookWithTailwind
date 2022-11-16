const mongoose = require('mongoose');

const Mongo_Uri_String = 'mongodb://localhost:27017/InoteBook';
const connectToMongo = () => {
    mongoose.connect(Mongo_Uri_String, () => {
        console.log('Connection Successful');
    })
}

module.exports = connectToMongo;