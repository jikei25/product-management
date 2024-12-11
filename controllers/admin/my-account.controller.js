const Account = require("../../models/account.model");
const md5 = require("md5");

// [GET] /admin/my-account/
module.exports.index = (req, res) => {
    res.render("admin/pages/my-account/index", {
        title: "Thông tin cá nhân"
    })
};

// [GET] /admin/my-account/edit
module.exports.edit = (req, res) => {
    res.render("admin/pages/my-account/edit", {
        title: "Chỉnh sửa thông tin"
    });
};

// [PATCH] /admin/my-account/edit
module.exports.editPatch = async (req, res) => {
    if (req.body.password) {
        req.body.password = md5(req.body.password);
    } else {
        delete req.body.password;
    }
    const id = res.locals.user.id;
    const checkEmailExist = await Account.findOne({
        deleted: false,
        email: req.body.email,
        _id: { $ne: id },
    });
    if (checkEmailExist) {
        req.flash("error", "Tài khoản đã tồn tại");
        const backURL=req.header('Referer') || '/';
        res.redirect(backURL);
        return;
    }

    await Account.updateOne({ _id : id }, req.body);
    const backURL=req.header('Referer') || '/';
    req.flash("success", "Cập nhật thành công")
    res.redirect(backURL);
};