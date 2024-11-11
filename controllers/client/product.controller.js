const { default: mongoose } = require("mongoose");
const Product = require("../../models/product.model");

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

// [GET] /products/detail/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        backURL=req.header('Referer') || '/';
        res.redirect("/products");
        return;
    }
    const product = await Product.findOne({
        _id: id,
        status: "active",
        deleted: false
    });
    if (!product) {
        backURL=req.header('Referer') || '/';
        res.redirect(backURL);
        return;
    }
    res.render("client/pages/product/detail", {
        title: "Chi tiết sản phẩm",
        product: product
    });
};