const UserModel = require('../models/User')
const ContactModel = require('../models/Contact')

module.exports = {
    async getAll(req, res, next){
        try{
            //Get all Contacts with owner
            const contacts = await ContactModel.find({owner: req.body.userId})

            //Send Contacts JSON
            res.send(locations)
        }
        catch(err){
            //Log Error and send it to middleware
            //TODO: Add more expressive errors
            console.log(err)
            next(err)
        }
    },
    async getOne(req, res, next){

    },
    async addOne(req, res, next){

    },
    async editOne(req, res, next){

    },
    async deleteOne(req, res, next){

    }
}