const express = require('express');
const fileUploader = require('express-fileupload')
const middleware = require('../middleware/middleware')
const userHandler = require('../data/userHandler')
const fileHandler = require('../data/fileHandler')

var router = express.Router();

router.post('/upload', middleware.validateUserToken, fileUploader(), (req, res) => {
  fileHandler.addFile(req.files.uploadedFile, 
    req.user, req.param('isPrivate')).then((file) => {
      res.json({downloadPath: file.downloadPath});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Whoopse.. Had an error')
    })
});

router.get('', (req, res) => res.send('Hello'));

module.exports = router;