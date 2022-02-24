const express = require('express')
const router = express.Router()

//Require Controllers
const userController = require('../controllers/UserController')
const contactController = require('../controllers/ContactController')

//Require Middleware
const validators = require('../helpers/validators')

//User Related Routes
router.post('/register', userController.create)
router.post('/authenticate', userController.authenticate)

//Contact Related Routes
router.get('/contacts', validators.validateUser, contactController.getAll)
router.get('/contact/:contactId', validators.validateUser, contactController.getOne)

//Export Router
module.exports = router