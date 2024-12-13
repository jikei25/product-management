const Cart = require("../../models/cart.model");

// [POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);
    const cartId = req.cookies.cartId;
    
    const cart = await Cart.findOne({
        _id: cartId,
    });
    if (!cart) {
        const backURL=req.header('Referer') || '/';
        res.redirect(backURL);
        return;
    }
    const checkProductExist = cart.products.find(item => item.productId == productId);
    if (checkProductExist) {
        const newQuantity = quantity + checkProductExist.quantity;
        await Cart.updateOne({ 'products.productId': productId }, {
            $set: { 'products.$.quantity': newQuantity }
        });
    } else {
        const objectCart = {
            quantity: quantity,
            productId: productId,
        };
        await Cart.updateOne({
            _id: cartId
        }, {
            $push : { products: objectCart }
        })
    }


    const backURL=req.header('Referer') || '/';
    res.redirect(backURL);
};