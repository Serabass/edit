var express = require('express');
var router = express.Router();
var fs = require('fs');
var domain = 'edit-serabass.c9.io';
var cheerio = require('cheerio');
var request = require('request');

router.get('/', function (req, res) {
    console.log(req.params);
    if ( ! req.params.id) {
        res.end();
        return;
    }
    
  req.models.fix.get(req.params.id, function (err, fix) {
      if (err) throw err;
      
      request.get(fix.url).on('response', function (stream) {
        var $ = cheerio,
            html = '';
        stream.on('data', function (data) {
          html += data;
        });
        
        stream.on('end', function () {
          var styles = $('link[rel="stylesheet"]', html);
          
          styles = styles.map(function () {
            return $(this).attr('href');
          }).toArray();
          
          console.log(styles);
          
          res.render('iframe', {
            diff: JSON.parse(fix.diff),
            handle: function (part) {
              return part.added ? 'color:green' : part.removed ? 'color:red' : 'color:grey';
            },
            styles: styles
          });
        });
      });
      
  });
});

module.exports = router;
