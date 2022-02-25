const UserModel = require('../models/User')
const ContactModel = require('../models/Contact')

module.exports = {
    async getAll(req, res, next){
        try{
            //Get all Contacts with owner
            const contacts = await ContactModel.find({owner: req.body.userId})

            //Send Contacts JSON
            res.send(contacts)
        }
        catch(err){
            //Log Error and send it to middleware
            //TODO: Add more expressive errors
            console.log(err)
            next(err)
        }
    },
    async getOne(req, res, next){
        try{
            //Get one Contact with owner
            const contact = await ContactModel.findOne({_id: req.params.contactId, owner: req.body.userId})

            //Send Contact JSON
            res.send(contact)
        }
        catch(err){
            //Log Error and send it to middleware
            //TODO: Add more expressive errors
            console.log(err)
            next(err)
        }
    },
    async addOne(req, res, next){
        try{
            console.log(req.body)
            //Check if contact already exists
            const contact = await ContactModel.findOne({owner: req.body.userId, $or: [{email: req.body.email}, {phoneNumber: req.body.phoneNumber}]})
            if(!contact){
                //If no profile picture
                if(!req.files){
                    const newContact = await ContactModel.create({
                        name: req.body.name,
                        email: req.body.email,
                        phoneNumber: req.body.phoneNumber,
                        owner: req.body.userId
                    })
                    //Send Contact JSON
                    res.send({name: newContact.name, email: newContact.email, phone: newContact.phone})
                }
                else{
                    const newContact = await ContactModel.create({
                        name: req.body.name,
                        email: req.body.email,
                        phoneNumber: req.body.phoneNumber,
                        profilePicture: req.files[0].fileName || undefined,
                        owner: req.body.userId
                    })
                    //Send Contact JSON
                    res.send({name: newContact.name, email: newContact.email, phone: newContact.phone, profilePicture: newContact.profilePicture})
                }
            }
            else{
                res.status(400).send({error: "Contact already exists"})
            }
        }
        catch(err){
            //Log Error and send it to middleware
            //TODO: Add more expressive errors
            console.log(err)
            next(err)
        }
    },
    async editOne(req, res, next){

    },
    async deleteOne(req, res, next){
        try{
            //Delete one Contact with owner
            const contact = await ContactModel.findByIdAndDelete({_id: req.params.contactId, owner: req.body.userId})

            //Send deleted Contact JSON
            res.send(contact)
        }
        catch(err){
            //Log Error and send it to middleware
            //TODO: Add more expressive errors
            console.log(err)
            next(err)
        }
    }
}