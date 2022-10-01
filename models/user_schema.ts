import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    wallet: {type: String, require: false},
    loggedTo: {type: Number, require: false},

});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
