const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.MONGODB_URL;

const connectDB = async () => {
    return mongoose
        .connect(URL)
        .then(()=> console.log(`connection to database established...`))
        .catch((err) => console.log(err));
};

module.exports = connectDB;