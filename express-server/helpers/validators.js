const jwt = require('jsonwebtoken')
const joi = require('joi');
const Joi = require('joi');

module.exports = {
    //User Validation middleware
    validateUser(req, res, next) {
        //Validate JWT from HTTPSonly cookie
        jwt.verify(req.cookies.token, req.app.get('secretKey'), function (err, decoded) {
            if (err) {
                //If Validation failed, send error
                res.status(400).json({ status: "error", message: err.message, data: null });
            } else {
                // Add User ID to request
                req.body.userId = decoded.id;
                next();
            }
        });
    },
    validateContact(req, res, next){
        return joi.object({
            name: joi.string().required(),
            email: Joi.string().required(),
            phoneNumber: Joi.string().regex().required(),
            profilePicture: joi.string().required()
        })
    }
}