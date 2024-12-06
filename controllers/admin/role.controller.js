const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");
const mongoose = require("mongoose");

// [GET] /admin/roles/
module.exports.index = async (req, res) => {
    const roles = await Role.find({
        deleted: false,
    });

    res.render("admin/pages/role/index", {
        title: "Nhóm quyền",
        records: roles
    });
};

// [GET] /admin/roles/create
module.exports.create = (req, res) => {
    res.render("admin/pages/role/create", {
        title: "Tạo nhóm quyền",

    });
};

// [POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
    const role = new Role(req.body);
    await role.save();
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
};

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
        return;
    }

    const role = await Role.findOne({
        _id: id,
        deleted: false
    });
    if (!role) {
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
        return;
    }

    res.render("admin/pages/role/edit", {
        title: "Chỉnh sửa nhóm quyền",
        item: role,
    });
};

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
        return;
    }

    try {
        await Role.updateOne({ _id: req.params.id }, req.body);
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/roles/edit/${req.params.id}`);
        return;
    }
    res.redirect(`${systemConfig.prefixAdmin}/roles/edit/${req.params.id}`);
};

// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
    const records = await Role.find({
        deleted: false,
    }).sort({ createdAt: 'desc' });

    res.render("admin/pages/role/permissions", {
        title: "Phân quyền",
        records: records,
    });
};

// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
    const permissions = JSON.parse(req.body.permissions);
    for (const item of permissions) {
        await Role.updateOne({ _id: item.id }, { permissions: item.permissions });
    }
    const backURL=req.header('Referer') || '/';
    res.redirect(backURL);
};