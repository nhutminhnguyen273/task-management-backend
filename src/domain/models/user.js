const mongoose = require('mongoose');
const genderEnum = require('../enums/gender-enum');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        gender: {
            type: String,
            enum: Object.values(genderEnum),
            default: genderEnum.OTHER,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        phoneNumber: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String
        },
        role: {
            type: mongoose.Schema.ObjectId,
            ref: 'Role',
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);