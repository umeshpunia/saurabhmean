const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        required: true,
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date
    }

})

const user = mongoose.model("user", UserSchema);
module.exports = user;