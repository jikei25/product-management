module.exports = (req) => {
    let searchObject = {
        keyword : ""
    }
     

    if (req.query.keyword) {
        searchObject.keyword = req.query.keyword;
        const regex = new RegExp(searchObject.keyword, "i");
        searchObject.regex = regex;
    }
    return searchObject;
};