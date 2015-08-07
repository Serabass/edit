var express = require('express');
var router = express.Router();
var fs = require('fs');
var domain = 'edit-serabass.c9.io';
var packer = require('packer');

router.get('/', function(req, res, next) {
    var js = fs.readFileSync('public/append.js').toString();
    js = js.replace(/\$DOMAIN\$/g, domain);
    js = js.replace(/\n\r/, ' ');
    js = packer.pack(js, true, true);
    
  res.render('index', { title: 'Express', script: 'javascript:'+ js});
});

module.exports = router;
