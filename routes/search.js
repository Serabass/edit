var express = require('express');
var router = express.Router();
var orm = require('orm');

router.get('/', function(req, res, next) {
  req.models.fix.find({
      url: orm.like('%' + req.query.pattern + '%')
  }, 30, function (err, data) {
      if (err) throw err;
        
        res.json(data);
  });
});

module.exports = router;
