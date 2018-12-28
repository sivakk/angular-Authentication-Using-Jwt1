const mongoose = require("mongoose");
const uniquevalidator = require('mongoose-unique-validator');


const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

});
UserSchema.plugin(uniquevalidator);

module.exports = mongoose.model("User", UserSchema);