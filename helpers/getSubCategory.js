const ProductCategory = require("../models/product-category.model");
module.exports.getCategory = async function getCategory (parentId, allCategory) {
    const subCategory = await ProductCategory.find({
        parentId: parentId,
        deleted: false,
        status: "active",
    });
    for (const category of subCategory) {
        allCategory.push(category);
        getCategory(category.id, allCategory);
    }
};