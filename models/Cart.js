const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const cartSchema = new Schema({
    name: {
        type: Schema.Types.ObjectId,
        ref: "Retail_user"
    },
    cart:
        [{
            productId: {
                type: String,
                required: true
            },
            productName: {
                type: String,
                required: true
            },
            productCategory: {
                type: String,
                required: true
            },
            productPrice: {
                type: Number,
                required: true
            }
        }]
    ,
    orders: [{


        order:
        {

            TotalPrice: {
                type: Number,
                required: true,
            },
            details: [{
                productId: {
                    type: String,
                    required: true
                },
                productName: {
                    type: String,
                    required: true
                },
                productCategory: {
                    type: String,
                    required: true
                },
                productPrice: {
                    type: Number,
                    required: true
                }
            }]



        }


    }]




})

module.exports = mongoose.model("retail_cart", cartSchema);