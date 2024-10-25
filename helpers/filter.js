module.exports = (req) => {
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
    return filterStatus;
}