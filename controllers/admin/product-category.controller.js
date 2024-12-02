const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");

// [GET] /admin/product-categories/
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };
    const categories = await ProductCategory.find(find);
    res.render("admin/pages/product-category/index", {
        title: "Danh mục sản phẩm",
        categories: categories,
    });
};

// [GET] /admin/product-categories/create
module.exports.createCategory = async (req, res) => {
    // function createTree(arr, parentId="") {
    //     let tree = [];
    //     arr.forEach(element => {
    //        if (element.parentId === parentId) {
    //             const children = createTree(arr, element.parentId);
    //             if (children.length > 0) {
    //                 element.children = children;
    //             }
    //             tree.push(element);
    //        } 
    //     });
    //     return tree;
    // }
    // let find = {
    //     deleted: false
    // };
    
    // const categories = await ProductCategory.find(find);
    // if (categories.length > 0) {
    //     console.log(createTree(categories));
    // }
    // console.log(createTree(categories));
    res.render("admin/pages/product-category/create", {
        title: "Tạo danh mục sản phẩm",
    });
};

// [POST] /admin/product-categories/create
module.exports.create = async (req, res) => {
    // console.log(req.body);
    if (req.body.position == "") {
        const total = await ProductCategory.countDocuments();
        req.body.position = total + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    const category = new ProductCategory(req.body);
    await category.save();
    res.redirect(`${systemConfig.prefixAdmin}/product-categories`);
};
