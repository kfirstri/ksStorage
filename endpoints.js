const express = require('express');
const fileUploader = require('express-fileupload')
var router = express.Router();

router.post('/upload', fileUploader(), (req, res) => {
  console.log('Hello');
  res.send('Thanks!');
});

router.get('', (req, res) => res.send('Hello'));

module.exports = router;