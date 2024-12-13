const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");
const cartRoutes = require("./cart.route");
const categoryMiddleware = require("../../middlewares/client/category.middleware");
const cartIdMiddleware = require("../../middlewares/client/cart.middleware");

module.exports = (app) => {
    app.use(categoryMiddleware.category);
    app.use(cartIdMiddleware.cartId);
    app.use("/", homeRoutes);
    app.use("/products", productRoutes);
    app.use("/cart", cartRoutes);
}