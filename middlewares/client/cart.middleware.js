const Cart = require("../../models/cart.model");

module.exports.cartId = async (req, res, next) => {
    if (!req.cookies.cartId) {
        const cart = new Cart();
        await cart.save();

        const expiresCookie = 24*60*60*1000;
        res.cookie("cartId", cart.id, {
            expires: new Date(Date.now() + expiresCookie)  
        });
    } else {
        const cart = await Cart.findOne({
            _id: req.cookies.cartId
        });
        if (cart) {
            cart.totalQuantity = cart.products.length;
            res.locals.miniCart = cart;
        }
    }
    next();
};