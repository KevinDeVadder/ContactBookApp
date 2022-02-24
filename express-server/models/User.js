const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

//Add User Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true 
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        maxLength: 50000
    }
}, { timestamps: true })

//Make sure the Email is Unique
UserSchema.plugin(uniqueValidator)

//Init and Export the User model
const User = mongoose.model('user', UserSchema)
module.exports = User