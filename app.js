var express = require('express');
var path = require('path');
var http = require('http');
var exphbs = require('express-handlebars');
var ForecastIo = require('forecastio');
var zipdb = require('zippity-do-dah');

var app = express();
var weather = new ForecastIo('438668b8945bed8564ce3ecc62112a27');

app.use(express.static(path.resolve(__dirname, "public")));

app.engine('hbs', exphbs());
app.set('view engine', 'hbs');

app.get('/', function(req, res, next){
  res.render('index', {title: 'Express-Weather'});
});

app.get('/:postcode', function(req, res, next){
  var zipcode = req.params.postcode;
  var location = zipdb.zipcode(zipcode);
  if (!location.zipcode){
    next();
    return;
  }

  var latitude = location.latitude;
  var longitude = location.longitude;

  weather.forecast(latitude)
  
  res.render('index', {title: location.city})
});
app.use(function(req, res){
  res.status(404).send('No location');
});

http.createServer(app).listen(3000, function(){
  console.log("listening on port 3000");
});
