const Product = require("../models/product.model");

module.exports.newPrice = (products) => {
    const newProducts = products.map(item => {
        item.newPrice = (item.price - item.price * item.discountPercentage / 100).toFixed(2);
        return item;
    });
    return newProducts;
};

module.exports.price = (item) => {
    item.newPrice = (item.price - item.price * item.discountPercentage / 100).toFixed(2);
    return item;
}