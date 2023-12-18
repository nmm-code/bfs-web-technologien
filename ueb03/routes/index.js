/**
 * Funktion, dass anhand eines Dateipfades
 * die angegebene Datei öffnet,
 * es als JSON-Objekt interpretiert
 * und als JavaScript-Objekt zurückgibt.
 * @throws Schlägt fehl, wenn
 * - Dateipfad ungültig ist.
 * - Datei kein gültiges JSON enthält.
 * @param {string} pathToFile Pfadangabe zur JSON-Datei
 */
const readJsonFile = (pathToFile) => {
  const fileSystem = require('fs');
  const file = fileSystem.readFileSync(pathToFile, 'utf8');
  const json = JSON.parse(file);
  return json;
}

var key = 0;
var express = require('express');
var router = express.Router();

const app = express();
app.use(express.urlencoded({ extended: true }));
const produkt =require('../data/produkte.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { produkt: produkt, title: 'Expresss',aktuelleZeit: new Date()});
});

router.get('/produkte/:key', function(req, res, next) {
  var key = req.params.key;
  const author = req.cookies.author;

  const produkt = readJsonFile('data/produkte.json');

  res.render('produktdetail', { title: 'Produktdetailseite', produkt: produkt, key: key, author: author,aktuelleZeit: new Date() });
});

router.get('/produkte', function(req, res, next) {
  res.render('produktuebersicht', {  produkt: produkt,aktuelleZeit: new Date() });
});





module.exports = router;
