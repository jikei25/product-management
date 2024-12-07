module.exports.login = (req, res, next) => {
    if (!(req.body.email && req.body.password)) {
        req.flash("error", "Vui lòng nhập đầy đủ thông tin");
        const backURL=req.header('Referer') || '/';
        res.redirect(backURL);
        return;
    }
    next();
};