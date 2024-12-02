module.exports.createCategory = (req, res, next) => {
    if (!req.body.title) {
        backURL=req.header('Referer') || '/';
        res.redirect(backURL);
        return;
    }
    next();
};