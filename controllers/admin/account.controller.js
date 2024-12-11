const Account = require("../../models/account.model");
const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");
const mongoose = require("mongoose");
const md5 = require("md5");

// [GET] /admin/accounts/
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };

    const records = await Account.find(find).select("-password -token");
    for (const record of records) {
        const role = await Role.findById(record.role_id);
        if (role) {
            record.role_title = role.title;
        }
        
    }
    res.render("admin/pages/account/index", {
        title: "Tài khoản",
        records: records,
    });
};

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
    const roles = await Role.find({
        deleted: false,
    }).sort({ createdAt: "desc" });

    res.render("admin/pages/account/create", {
        title: "Tạo tài khoản",
        roles: roles,
    })
};

// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
    const checkEmailExist = await Account.findOne({
        deleted: false,
        email: req.body.email
    });
    console.log(checkEmailExist);
    if (checkEmailExist) {
        req.flash("error", "Tài khoản đã tồn tại");
        const backURL=req.header('Referer') || '/';
        res.redirect(backURL);
        return;
    }
    
    req.body.password = md5(req.body.password)

    const record = new Account(req.body);
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
};

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
        return;
    }

    const roles = await Role.find({
        deleted: false,
    });

    const account = await Account.findOne({
        _id: id,
        deleted: false,
    });
    if (!account) {
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
        return;
    }

    res.render("admin/pages/account/edit", {
        title: "Chỉnh sửa sản phẩm",
        account: account,
        roles: roles,
    });
};

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
    const checkEmailExist = await Account.findOne({
        deleted: false,
        email: req.body.email,
        _id: { $ne: req.params.id },
    });
    if (checkEmailExist) {
        req.flash("error", "Tài khoản đã tồn tại");
        const backURL=req.header('Referer') || '/';
        res.redirect(backURL);
        return;
    }
    await Account.updateOne({ _id : req.params.id }, req.body);
    const backURL=req.header('Referer') || '/';
    req.flash("success", "Cập nhật thành công")
    res.redirect(backURL);

};