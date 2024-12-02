const Product = require("../../models/product.model");
const filter = require("../../helpers/filter");
const search = require("../../helpers/search");
const pagination = require("../../helpers/pagination");
const systemConfig = require("../../config/system");
const { default: mongoose } = require("mongoose");

// [GET] /admin/products
module.exports.index = async (req, res) => {
    const filterStatus = filter(req);
    const searchObject = search(req);
    
    let sort = {};

    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    } else {
        sort.position = "desc";
    }

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

    const products = await Product.find(find).skip(paginationObject.skip).limit(paginationObject.limit).sort(sort);
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
    const backURL = req.header('Referer') || '/';
    res.redirect(backURL);
}; 

// [GET] /admin/products/create
module.exports.createItem = async (req, res) => {
    res.render("admin/pages/product/create", {
        title: "Tạo mới sản phẩm"
    });
};

// [POST] /admin/products/create
module.exports.create = async (req, res) => {
    req.body.price = parseFloat(req.body.price);
    req.body.discountPercentage = parseFloat(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if (req.body.position == "") {
        const totalProducts = await Product.countDocuments();
        req.body.position = totalProducts + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    
    const product = new Product(req.body);
    await product.save();
    res.redirect(`${systemConfig.prefixAdmin}/products`);
};

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
        return;
    }

    const product = await Product.findOne({ _id: id, deleted: false });
    if (!product) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
        return;
    }

    res.render("admin/pages/product/edit", {
        title: "Chỉnh sửa sản phẩm",
        item: product
    });
};

// [POST] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    req.body.price = parseFloat(req.body.price);
    req.body.discountPercentage = parseFloat(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if (req.body.position == "") {
        const totalProducts = await Product.countDocuments();
        req.body.position = totalProducts + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    try {
        await Product.updateOne({ _id: req.params.id}, req.body);
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products/edit/${req.params.id}`);
        return;
    }
    res.redirect(`${systemConfig.prefixAdmin}/products/edit/${req.params.id}`);
};

// [GET] /admin/products/detail/:id
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
    res.render("admin/pages/product/detail", {
        title: "Chi tiết sản phẩm",
        product: product
    });
};