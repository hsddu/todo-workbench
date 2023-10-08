var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/create', function(req, res, next) {
  console.log('++ post server:', req.body);
  res.send({
    data: 'ok'
  });
});

module.exports = router;
