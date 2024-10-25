module.exports = async (req, Product, find) => {
    let paginationObject = {
        limit: 4,
        currentPage: 1
    };

    if (req.query.page) {
        paginationObject.currentPage = parseInt(req.query.page);
    }

    const total = await Product.countDocuments(find);
    paginationObject.totalPage = Math.ceil(total / paginationObject.limit);
    paginationObject.skip = (paginationObject.currentPage - 1) * paginationObject.limit;
    
    return paginationObject;
};