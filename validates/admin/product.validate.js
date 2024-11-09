module.exports.createProduct = (req, res, next) => {
    if (!req.body.title) {
        backURL=req.header('Referer') || '/';
        res.redirect(backURL);
        return;
    }
    next();
};