var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', script: 'javascript:'+ fs.readFileSync('F:/Git/edit/public/append.js')});
});

module.exports = router;
