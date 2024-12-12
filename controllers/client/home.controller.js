const Product = require("../../models/product.model");
const calculatePrice = require("../../helpers/calculatePrice");
// [GET] /
module.exports.index = async (req, res) => {
    const featuredProducts = await Product.find({
        featured: "1",
        deleted: false,
        status: "active",
    }).sort({ position: "desc"}).limit(5);

    const newFeaturedProducts = calculatePrice.newPrice(featuredProducts);

    res.render("client/pages/home/index", {
        title: "Trang chủ",
        featuredProducts: newFeaturedProducts,
    });
}