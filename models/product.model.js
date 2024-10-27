const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    position: Number,
    status: String,
    deleted: Boolean,
    deletedAt: Date
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;