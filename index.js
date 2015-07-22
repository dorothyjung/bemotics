/* INIT, CONFIGS */
var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/* ROUTING - VIEWS */
app.get('/', function(request, response) {
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

app.get('/create_participant', function(request, response) {
  response.render('pages/create_participant');
});

app.get('/create_project', function(request, response) {
  response.render('pages/create_project');
});

app.get('/participants', function(request, response) {
  response.render('pages/participants');
});

app.get('/projects', function(request, response) {
  response.render('pages/projects');
});

app.get('/results_individual', function(request, response) {
  response.render('pages/results_individual');
});

app.get('/results_project', function(request, response) {
  response.render('pages/results_project');
});

app.get('/conduct_trial', function(request, response) {
  response.render('pages/conduct_trial');
});

app.get('/participant_page', function(request, response) {
  response.render('pages/participant_page');
});


/* ROUTING - RESTFUL API */

app.get('/db', function (request, response) {
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

/* create a new trial */
app.post('/db/create_new_trial/:project/:id', function(req, res){
  console.log(req.body);
  res.json(req.body);

  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query("CREATE TABLE IF NOT EXISTS " + req.params.project + "_" + req.params.id + "(time float,engagement float,frustration float, shorttermexcitement float, longtermexcitement float);",
        function(err, result) {
      done();
      if (err)
       { console.error(err); res.send("Error " + err); }
      else
       { console.log("Successfully created table for new trial"); }
    });
  });
});

/* send new headset reading to pgdb */
app.post('/db/input_eeg_data/:project/:id', function(req, res){
  console.log(req.body);
  res.json(req.body);

  var sec = req.body.time;
  var engage = req.body.engagement;
  var frust = req.body.frustration;
  var ste = req.body.shorttermexcitement;
  var lte = req.body.longtermexcitement;

  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query("INSERT INTO " + req.params.project + "_" + req.params.id + "(time, engagement, frustration, shorttermexcitement, longtermexcitement) values($1,$2,$3,$4,$5);",
        [sec, engage, frust, ste, lte],
        function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { console.log("Successfully inputted values into database"); }
    });
  });
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


