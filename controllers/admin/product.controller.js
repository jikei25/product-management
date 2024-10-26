const Product = require("../../models/product.model");
const filter = require("../../helpers/filter");
const search = require("../../helpers/search");
const pagination = require("../../helpers/pagination");

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

    const paginationObject = await pagination(req, Product, find);

    const products = await Product.find(find).skip(paginationObject.skip).limit(paginationObject.limit);
    res.render("admin/pages/product/index", {
        title: "Danh sách sản phẩm",
        products: products,
        buttons: filterStatus,
        keyword: searchObject.keyword,
        pagination: paginationObject
    });
};

module.exports.changeStatus = async(req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({_id: id}, {status: status});
    
    const backURL=req.header('Referer') || '/';
    res.redirect(backURL);
};