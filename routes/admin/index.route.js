const dashboardRoutes = require("./dashboard.route");
const system = require("../../config/system");
module.exports = (app) => {
    const PATH_ADMIN = system.prefixAdmin;    
    app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);
};
