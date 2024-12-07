module.exports.createPost = (req, res, next) => {
    if (!req.body.fullName) {
        req.flash("error", "Vui lòng điền tên");
        const backURL=req.header('Referer') || '/';
        res.redirect(backURL);
        return;
    }

    if (!req.body.email) {
        req.flash("error", "Vui lòng điền email");
        const backURL=req.header('Referer') || '/';
        res.redirect(backURL);
        return;
    }

    if (!req.body.password) {
        req.flash("error", "Vui lòng điền mật khẩu");
        const backURL=req.header('Referer') || '/';
        res.redirect(backURL);
        return;
    }
    
    next();
};

module.exports.editPatch = (req, res, next) => {
    if (!req.body.fullName) {
        req.flash("error", "Vui lòng điền tên");
        const backURL=req.header('Referer') || '/';
        res.redirect(backURL);
        return;
    }

    if (!req.body.email) {
        req.flash("error", "Vui lòng điền email");
        const backURL=req.header('Referer') || '/';
        res.redirect(backURL);
        return;
    }

    next();
};
