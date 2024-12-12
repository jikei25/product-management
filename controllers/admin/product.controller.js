const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const filter = require("../../helpers/filter");
const search = require("../../helpers/search");
const pagination = require("../../helpers/pagination");
const systemConfig = require("../../config/system");
const { default: mongoose } = require("mongoose");
const createTree = require("../../helpers/createTree");
const Account = require("../../models/account.model");

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
    for (const product of products) {
        const user = await Account.findOne({
            _id: product.createdBy.accountId
        });
        if (user) product.createdBy.accountId = user.fullName;

        if (product.updatedBy.accountId) {
            const accountId = product.updatedBy.accountId.slice(-1)[0];
            const userUpdated = await Account.findOne({
                _id: accountId
            });
            if (userUpdated) {
                product.userUpdated = userUpdated.fullName;
            }
        }     
    }

    

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
    const updatedBy = {
        accountId: res.locals.user.id,
        updatedAt: Date.now(),
    };
    await Product.updateOne({ _id: id }, { status: status, $push: { updatedBy: updatedBy } });
    
    const backURL=req.header('Referer') || '/';
    res.redirect(backURL);
};

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const status = req.body.type;
    const ids = req.body.ids.split(", ");
    const updatedBy = {
        accountId: res.locals.user.id,
        updatedAt: Date.now(),
    };
    switch (status) {
        case "active":
        case "inactive":
            await Product.updateMany({ _id: ids }, { status: status, $push: { updatedBy: updatedBy } });
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
    await Product.updateOne({ _id: id }, { deleted: true, deletedBy: { accountId: res.locals.user.id, deletedAt: Date.now() } });
    const backURL = req.header('Referer') || '/';
    res.redirect(backURL);
}; 

// [GET] /admin/products/create
module.exports.createItem = async (req, res) => {
    const categories = await ProductCategory.find({
        deleted: false,
    });

    const newCategories = createTree(categories);
    res.render("admin/pages/product/create", {
        title: "Tạo mới sản phẩm",
        categories: newCategories
    });
};

// [POST] /admin/products/create
module.exports.create = async (req, res) => {
    const permissions = res.locals.role.permissions;
    if (!permissions.includes("products_create")) {
        return;
    }
    req.body.price = parseFloat(req.body.price);
    req.body.discountPercentage = parseFloat(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if (req.body.position == "") {
        const totalProducts = await Product.countDocuments();
        req.body.position = totalProducts + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    req.body.createdBy = {
        accountId: res.locals.user.id
    }
    const product = new Product(req.body);
    await product.save();
    res.redirect(`${systemConfig.prefixAdmin}/products`);
};

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    const categories = await ProductCategory.find({
        deleted: false,
    });

    const newCategories = createTree(categories);
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
        item: product,
        categories: newCategories,
    });
};

// [PATCH] /admin/products/edit/:id
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
    const updatedBy = {
        accountId: res.locals.user.id,
        updatedAt: Date.now(),
    };

    try {
        await Product.updateOne({ _id: req.params.id }, {
            ...req.body,
            $push: { updatedBy: updatedBy }
        });
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
        const backURL=req.header('Referer') || '/';
        res.redirect(backURL);
        return;
    }
    const product = await Product.findOne({
        _id: id,
        deleted: false
    });

    if (!product) {
        const backURL=req.header('Referer') || '/';
        res.redirect(backURL);
        return;
    }
    res.render("admin/pages/product/detail", {
        title: "Chi tiết sản phẩm",
        product: product
    });
};