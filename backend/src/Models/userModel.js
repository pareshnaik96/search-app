const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: [true, "firstname is required"],
            trim: true
        },
        lastname: {
            type: String,
            required: [true, "lastname is required"],
            trim: true
        },
        gender: {
            type: String,
            required: [true, "gender is required"],
            enum: ["male", "female", "other"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "email is required"],
            trim: true
        },
        phone: {
            type: String,
            required: [true, "phone is required"],
            trim: true
        }
    }, { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);

