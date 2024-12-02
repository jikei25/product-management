const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productCategorySchema = mongoose.Schema({
    title: String,
    description: String,
    parentId: {
        type: String,
        default: "",
    },
    thumbnail: String,
    position: Number,
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
    slug: {
        type: String,
        slug: "title",
        unique: true
    }
}, { timestamps: true });

const ProductCategory = mongoose.model("product-categories", productCategorySchema);
module.exports = ProductCategory;