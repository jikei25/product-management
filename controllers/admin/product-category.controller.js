const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");
const createTree = require("../../helpers/createTree");
// [GET] /admin/product-categories/
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };
    const categories = await ProductCategory.find(find);
    const newCategories = createTree(categories);
    res.render("admin/pages/product-category/index", {
        title: "Danh mục sản phẩm",
        categories: newCategories,
    });

};

// [GET] /admin/product-categories/create
module.exports.createCategory = async (req, res) => {
    
    let find = {
        deleted: false
    };
    
    const categories = await ProductCategory.find(find);
    const newCategories = createTree(categories);

    res.render("admin/pages/product-category/create", {
        title: "Tạo danh mục sản phẩm",
        categories: newCategories
    });
};

// [POST] /admin/product-categories/create
module.exports.create = async (req, res) => {
    console.log(req.body);
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

// [GET] /admin/product-categories/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;

    const category = await ProductCategory.findOne({
        _id: id,
        deleted: false,
    });

    const categories = await ProductCategory.find({
        deleted: false,
    });
    const newCategories = createTree(categories);
    console.log(category);
    res.render("admin/pages/product-category/edit", {
        title: "Chỉnh sửa danh mục sản phẩm",
        categories: newCategories,
        category: category,
    });
};
