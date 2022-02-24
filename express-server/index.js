var express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const routes = require('./views/index')

//Init Dotenv package
dotenv.config()

//Init Express App
app = express()

//Init Morgan Logging
var accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' })
app.use(morgan('combined', {
    stream: accessLogStream
}))

//Connect to MongoDB
try{
  mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true})
  mongoose.Promise = global.Promise
} catch(err){
  console.log(err)
}

//Set JWT Secret Key
app.set('secretKey', process.env.SECRET)

//Init CORS Package
app.use(cors())

//Init Helmet Package
app.use(helmet({
  contentSecurityPolicy: false
}))

//Init Cookie Parser
app.use(cookieParser())

//Init Body Parser
app.use(bodyParser.json())

//Init API Routes
app.use('/api/v1', routes)

//General Error Handling
app.use((err, req, res, next) => {
  console.log(err)
    res.status(422).send({ error: err})
})

//Start Express App
var port = 5000
app.listen(port)
console.log('server started '+ port)