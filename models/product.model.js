const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = mongoose.Schema({
    title: String,
    categoryId: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    position: Number,
    status: String,
    featured: String,
    createdBy:{
        accountId: String,
        createdAt: {
            type: Date,
            default: Date.now()
        },
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedBy: {
        accountId: String,
        deletedAt: Date
    },
    updatedBy: {
        accountId: String,
        updatedAt: Date,
    },
    slug: {
        type: String,
        slug: "title",
        unique: true
    }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;