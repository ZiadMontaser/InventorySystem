require('dotenv').config();
const mongoose = require('mongoose')


function connectDB(){
    mongoose.connect(process.env.DATABASE_URI);
}

module.exports = connectDB;