const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    //Create New User
    async create(req, res, next) {
        try{
            //Hash User Password
            let password = bcrypt.hashSync(req.body.password, 100)

            //Create User in DB
            const user = await UserModel.create({ name: req.body.name, email: req.body.email, password: password, confirmed: true})    

            //Send User JSON
            res.send(user) 
        }
        catch(err){
            //Log Error and send it to middleware
            //TODO: Add more expressive errors
            console.log(err)
            next(err)
        }
    },

    //Login User
    async authenticate(req, res, next) {
        try{
            //Try to find User in DB
            let user = await UserModel.findOne({email:req.body.email})

            //Check if User Password matches DB password
            if(bcrypt.compareSync(req.body.password, user.password)) {

                //Create payload to send
                let toSend = {
                    name: user.name,
                    email: user.email
                }

                //Create JWT Token
                const accessToken = jwt.sign({id: user._id}, req.app.get('secretKey'), { expiresIn: '1h' })
                
                //Send the Token over a HTTPSonly Cookie
                res.cookie("token", accessToken, {secure: true, httpOnly: true})

                //Send JSON payload
                res.send(toSend)
                
            }
            else{
                //Send Invalid Credentials Error
                res.status(403).json({status:"error", message: "Invalid email/password!!!"})
            }
        }
        catch(err){
            //Log Error and send it to middleware
            //TODO: Add more expressive errors
            console.log(err)
            next(err)
        }
     }
}
