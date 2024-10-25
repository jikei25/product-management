const Product = require("../../models/product.model");
const filter = require("../../helpers/filter");
const search = require("../../helpers/search");

// [GET] /admin/products
module.exports.index = async (req, res) => {
    const filterStatus = filter(req);
    const searchObject = search(req);
    
    let find = {
        deleted: false
    };
    if (req.query.status) {
        find.status = req.query.status;
    }
    
    if (searchObject.regex) {
        find.title = searchObject.regex;
    }
    


    const products = await Product.find(find);
    res.render("admin/pages/product/index", {
        title: "Danh sách sản phẩm",
        products: products,
        buttons: filterStatus,
        keyword: searchObject.keyword
    });
};