const express = require('express')
const router = express.Router()

//Require Controllers
const userController = require('../controllers/UserController')

//User Related Routes
router.post('/register', userController.create)
router.post('/authenticate', userController.authenticate)

//Export Router
module.exports = router