const mongoose = require('mongoose');

const Mongo_Uri_String = 'mongodb://127.0.0.1:27017/InoteBook';
const connectToMongo = () => {
    mongoose.connect(Mongo_Uri_String, () => {
        console.log('Connection Successful');
    })
}

module.exports = connectToMongo;