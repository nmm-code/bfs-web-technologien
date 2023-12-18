var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// Middleware für das Parsen von JSON-Daten im Request-Body


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

/**
 * Funktion, dass gemäß Dateipfad eine Datei schreibt.
 * @throws Schlägt fehl, wenn
 * - Dateipfad ungültig ist.
 * - Daten sich nicht in JSON formatieren lassen.
 * @param {string} pathToFile  Pfadangabe zur JSON-Datei
 * @param {object} object Objekt, dass als JSON gespeichert werden soll
 */
const writeJsonFile = (pathToFile, object) => {
  const fileSystem = require('fs');
  const json = JSON.stringify(object);
  fileSystem.writeFileSync(pathToFile, json);
}

const axios = require('axios');


app.get('/personen', async (req, res) => {

    // Sende einen GET-Request an die externe API
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');

    // Extrahiere die Personendaten aus der API-Antwort
    const personen = response.data;

    // Generiere den HTML-Code mit Pug

    res.render('personen', { personen:personen ,aktuelleZeit: new Date()});

  
  
});


// POST-Route
app.post('/submit-review/:key', (req, res) => {
  var key = req.params.key;
  console.log(key);
  const { author, rating, review, productIndex } = req.body;

  const productFilePath = 'data/produkte.json';


  const products = readJsonFile(productFilePath);


  const product = products.produkt[key];

  var tmp = "";
  for (let index = 0; index < rating; index++) {
    tmp = tmp + "&#9733;";
  }
  tmp = tmp + " Sterne";

  res.cookie('author', author);
  product.rezensionen.push({
    autor: author,
    bewertung: tmp,
    bewertungstext: review
  });

  writeJsonFile(productFilePath, products);


  res.redirect(`/produkte/${key}`);
}

);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});








module.exports = app;
