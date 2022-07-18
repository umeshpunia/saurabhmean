const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect('mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@cluster0.xjuhr.mongodb.net/' + process.env.DB_NAME + '?retryWrites=true&w=majority')
mongoose.connection.on("error", err => {
    console.log("err", error);
})
mongoose.connection.on("open", res => {
    console.log("connection Okk");
})