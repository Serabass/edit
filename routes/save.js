var express = require('express');
var router = express.Router();
var diff = require('diff');
var bodyParser = require('body-parser');
require('colors');
router.post('/', bodyParser.text({limit: '1000mb'}), function (req, res) {
    var before = req.body.before;
    var after = req.body.after;

    var df = diff.diffChars(before, after);

    df = df.filter(function (el) {
        return true;
        return !(el.added === void 0 && el.removed === void 0);
    });

    df.forEach(function(part){
        // green for additions, red for deletions
        // grey for common parts
        var color = part.added ? 'green' :
            part.removed ? 'red' : 'grey';
        process.stderr.write(part.value[color]);
    });

    console.log();

    res.redirect(req.headers.referer);
});

module.exports = router;
