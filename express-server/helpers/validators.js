var jwt = require('jsonwebtoken')

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
    }
}