const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({

    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: [String],
        maxlength: 3
    },
    price: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

module.exports = (mongoose.model("Retail_product", ProductSchema));