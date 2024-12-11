const ProductCategory = require("../../models/product-category.model");
const createTree = require("../../helpers/createTree");

module.exports.category = async(req, res, next) => {
    let find = {
        deleted: false
    };
    const categories = await ProductCategory.find(find);
    const newCategories = createTree(categories);
    res.locals.categoryRecords = newCategories;
    next();
};