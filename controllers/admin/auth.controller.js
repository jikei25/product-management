const md5 = require("md5");
const Account = require("../../models/account.model");
const systemConfig = require("../../config/system");

// [GET] /admin/auth/login
module.exports.login = async (req, res) => {
    if (req.cookies.token) {
        const user = await Account.findOne({
            token: req.cookies.token,
        });
        if (user) {
            res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
            return;
        }
    } 
    res.render("admin/pages/auth/login", {
        title: "Đăng nhập",
    });
};

// [POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await Account.findOne({
        email: email,
        deleted: false,
    });
    if (!user) {
        req.flash("error", "Tài khoản không tồn tại");
        const backURL=req.header('Referer') || '/';
        res.redirect(backURL);
        return;
    }
    if (md5(password) != user.password) {
        req.flash("error", "Sai mật khẩu");
        const backURL=req.header('Referer') || '/';
        res.redirect(backURL);
        return;
    }
    if (user.status == "inactive") {
        req.flash("error", "Tài khoản đã bị khóa");
        const backURL=req.header('Referer') || '/';
        res.redirect(backURL);
        return;
    }

    res.cookie("token", user.token);
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
};

// [GET] /admin/auth/logout
module.exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
};