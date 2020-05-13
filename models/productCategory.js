const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productCategorySchema = new Schema({

    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String
    },
    image: {
        type: String
    }
})

module.exports = (mongoose.model("Retail_product_category", productCategorySchema));