const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    userId: String,
    products: [
        {
            productId: String,
            quantity: Number,
        }
    ],
    
}, { timestamps: true });

const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;