const express = require('express');
const fileUploader = require('express-fileupload')
const middleware = require('../middleware/middleware')
const userHandler = require('../data/userHandler')
const fileHandler = require('../data/fileHandler')

var router = express.Router();

// Handle upload request
router.post('/upload', middleware.validateUserField({
  field: 'token'
}), fileUploader(), (req, res) => {
  fileHandler.addFile(req.files.uploadedFile, req.user, req.param('isPrivate'))
    .then((file) => {
      res.json({
        downloadPath: file.downloadPath
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Whoopse.. Had an error')
    })
});

// Handle private files download
router.get('/:filetoken', (req, res) => {
  console.log(req.params.path);
  res.send('hi');
});

// Handle public files download
router.get('/:username/*', middleware.validateUserField({
  field: 'username'
}), (req, res) => {
  let fileName = req.params[0];
  if (!fileName) return res.status(400).send('Missing file name');

  let file = fileHandler.getFile(req.param('username'), fileName)
  if (!file) return res.status(404).send('No file exist by that name.');

  res.download(file.localPath)
});

module.exports = router;