var express = require('express');
var router = express.Router();
var diff = require('diff');
var bodyParser = require('body-parser');

router.post('/', function (req, res) {
    var diff = req.body.diff;
    
    req.models.fix.create({
        date: new Date(),
        ip: req.ip,
        url: req.body.url,
        diff: diff
    }, function (err, fix) {
        
        if (err) throw err;
        
        res.redirect(req.headers.referer);
    });
});

module.exports = router;
