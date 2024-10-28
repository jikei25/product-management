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

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async(req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({_id: id}, {status: status});
    
    const backURL=req.header('Referer') || '/';
    res.redirect(backURL);
};

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const status = req.body.type;
    const ids = req.body.ids.split(", ");
    switch (status) {
        case "active":
        case "inactive":
            await Product.updateMany({ _id: ids }, { status: status });
            break;
        case "delete-all":
            await Product.updateMany({ _id: ids }, { deleted: true, deletedAt: new Date() });
        default:
            break;
    }
    
    const backURL=req.header('Referer') || '/';
    res.redirect(backURL);
};

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne({ _id: id }, { deleted: true, deletedAt: new Date() });
    const backURL=req.header('Referer') || '/';
    res.redirect(backURL);
};  