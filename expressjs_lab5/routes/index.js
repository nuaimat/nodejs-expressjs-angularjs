var express = require('express');
var router = express.Router();

var inventors = require('../inventors.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Inventors table' , inventors: inventors});
});

module.exports = router;
