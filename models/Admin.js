const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AdminSchema = new Schema({


    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    adminPhone: {
        type: Number,
        default: 8578814454

    },



}, {
    timestamps: true
});

module.exports = (mongoose.model("Retail_admin", AdminSchema));