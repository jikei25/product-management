const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const getSubCategory = require("../../helpers/getSubCategory");
const calculatePrice = require("../../helpers/calculatePrice");

// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    });
    const newProducts = products.map(item => {
        item.newPrice = (item.price - item.price * item.discountPercentage / 100).toFixed(2);
        return item;
    });
    res.render("client/pages/product/index", {
        title: "Danh sách sản phẩm",
        products: newProducts
    });
};

// [GET] /products/detail/:slug
module.exports.detail = async (req, res) => {
    const slug = req.params.slug;
    const product = await Product.findOne({
        slug: slug,
        status: "active",
        deleted: false
    });
    if (!product) {
        const backURL=req.header('Referer') || '/';
        res.redirect(backURL);
        return;
    }
    if (product.categoryId) {
        const category = await ProductCategory.findOne({
            _id: product.categoryId,
            deleted: false,
            status: "active",
        });
        product.category = category;
    }
    const newProduct = calculatePrice.price(product);
    res.render("client/pages/product/detail", {
        title: "Chi tiết sản phẩm",
        product: newProduct
    });
};

// [GET] /products/:slug
module.exports.getProductByCategory = async (req, res) => {
    const slug = req.params.slug;
    const category = await ProductCategory.findOne({
        slug: slug,
        deleted: false,
        status: "active",
    })

    if (!category) {
        const backURL=req.header('Referer') || '/';
        res.redirect(backURL);
        return;
    }
    
    let allSub = [];
    await getSubCategory.getCategory(category.id, allSub);
    const subCategory = allSub.map(item => item.id);
    
    const products = await Product.find({
        categoryId: { $in: [category.id, ...subCategory] },
        deleted: false,
        status: "active",
    }).sort({ position: "desc" });
    const newProducts = calculatePrice.newPrice(products);
    res.render("client/pages/product/index", {
        title: category.title,
        products: newProducts
    });
};