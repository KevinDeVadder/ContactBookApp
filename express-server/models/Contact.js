const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Add Contact Schema
const ContactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true 
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        maxLength: 14,
        minLength: 4
    },
    profilePicture: {
        type: String
    }
}, { timestamps: true })

//Init and Export the Contact model
const Contact = mongoose.model('contact', ContactSchema)
module.exports = Contact