var express = require('express');
var router = express.Router();
var fs = require('fs');
var diff = require('diff');
var tidy = require('htmltidy').tidy;
var minify = require('html-minifier').minify;
var bodyParser = require('body-parser');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', script: 'javascript:'+ fs.readFileSync('F:/Git/edit/public/append.js')});
});

router.post('/save', bodyParser.text({limit: '1000mb'}), function (req, res) {
  var before = req.body.before;
  var after = req.body.after;

  var beforeMinified = minify(before);
  var afterMinified = minify(after);

  var df = diff.diffChars(beforeMinified, afterMinified);

  df = df.filter(function (el) {
      return !(el.added === void 0 && el.removed === void 0);
  });

  console.log(df);

  res.redirect(req.headers.referer);
});

module.exports = router;
