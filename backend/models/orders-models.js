const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    user: {
        type: [mongoose.Types.ObjectId],
        ref: 'users'
        //required: true,
    },
    products: [
        {
            productId: {
            type: [mongoose.Types.ObjectId],
            ref: 'products'
        },
        quantity: {
            type: Number,
            //required: true
        }
    }
    ] 
});

module.exports = mongoose.model('orders', orderSchema)