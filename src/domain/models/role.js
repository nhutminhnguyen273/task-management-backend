const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
    {
        roleName: {
            type: String,
            unique: true,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Role', roleSchema);