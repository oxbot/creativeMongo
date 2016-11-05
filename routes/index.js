var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var question = mongoose.model('Question');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: 'public' });
});

module.exports = router;
