var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    username: String,
    password: {type: String, select: false},
    firstName: String,
    lastName: String,
    websites: [{type: mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"}],
    isAdmin: Boolean,
    facebook: {
        id:    String,
        token: String
    },
    google: {
        id:    String,
        token: String
    }
}, {collection: "user"});

module.exports =  userSchema;