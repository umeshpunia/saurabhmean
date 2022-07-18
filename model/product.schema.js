const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    richDescription: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: ''
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    inStock: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    review: {
        type: String,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const product = mongoose.model('product', productSchema);
module.exports = product;