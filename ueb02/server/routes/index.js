var express = require('express');
var router = express.Router();

const produkt =require('../data/produkte.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Expresss'});
});

router.get('/detailseite/:key', function(req, res, next) {
  var key = req.params.key;
  res.render('produktdetail', { title: 'Produktdetailseite', produkt: produkt, key: key });
});



router.get('/produkte', function(req, res, next) {
  res.render('produktuebersicht', {  produkt: produkt });
});

module.exports = router;
