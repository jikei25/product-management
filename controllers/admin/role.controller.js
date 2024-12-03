// [GET] /admin/roles/
module.exports.index = (req, res) => {
    res.render("admin/pages/role/index", {
        title: "Nhóm quyền",

    });
};

// [GET] /admin/roles/create
module.exports.create = (req, res) => {
    res.render("admin/pages/role/create", {
        title: "Tạo nhóm quyền",

    });
};