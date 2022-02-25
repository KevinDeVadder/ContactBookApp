const multer = require('multer')
const path = require('path')

module.exports = multer({
    storage: multer.diskStorage({
      destination: function(req, file, callback) {
        callback(null, __dirname + '/static/uploads/')
      },
      filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
      }
    })
})