const Product = require("../../models/product.model");

// [GET] /admin/products
module.exports.index = async (req, res) => {
    let filterStatus = [
        {
            content: "Tất cả",
            status: "",
            class: ""
        },
        {
            content: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            content: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }
    ]
    
    if (req.query.status) {
        let index = filterStatus.findIndex((item) => item.status == req.query.status);
        filterStatus[index].class = "active";
    } else {
        filterStatus[0].class = "active";
    }

    let find = {
        deleted: false
    };
    if (req.query.status) {
        find.status = req.query.status;
    }

    const products = await Product.find(find);
    res.render("admin/pages/product/index", {
        title: "Danh sách sản phẩm",
        products: products,
        buttons: filterStatus
    });
};