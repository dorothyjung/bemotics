/* INIT, CONFIGS */
var express = require('express');
var app = express();
var pg = require('pg');

// var morgan = require('morgan');             // log requests to the console (express4)
// var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
// var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// pg.connect(process.env.DATABASE_URL);
// app.use(morgan('dev'));

// set the port of our application
// process.env.PORT lets the port be set by Heroku
app.set('port', (process.env.PORT || 5000));

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');

// set the view engine to ejs
app.set('view engine', 'ejs');


/* ROUTING */
// set the home page route
app.get('/', function(request, response) {

  // ejs render automatically looks in the views folder
  response.render('pages/index');
});

app.get('/sign_up', function(request, response) {
	response.render('pages/sign_up');
});

app.get('/login', function(request, response) {
	response.render('pages/login');
});

app.get('/dashboard', function(request, response) {
  response.render('pages/dashboard');
});

app.get('/realtime', function(request, response) {
  response.render('pages/realtime');
});

app.get('/run_trial', function(request, response) {
  response.render('pages/run_trial');
});

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

app.post('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_data_1', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


