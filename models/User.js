const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: [true, "the username is allready exists"],
        minLength: [5, "Username Should be longer than 5 Characters."]
    },
    password: {
        type: String,
        require: true,

    },
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);