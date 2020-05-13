const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Retail_Order_Schema = new Schema({

    order: {
        type: [{}],
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    disptched: {
        type: Boolean,
        default: false
    },
    delivered: {
        type: Boolean,
        default: false
    },
    cancled: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    total: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }

},
    { timestamps: true }

)

module.exports = mongoose.model("Retail_order", Retail_Order_Schema);