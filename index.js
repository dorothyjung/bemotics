var express = require('express');
var app = express();
var pg = require('pg');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

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

app.get('/realtime', function(request, response) {
  response.render('pages/realtime');
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

app.get('/start_test', function(request, response) {
  response.render('pages/start_test');
});

app.get('/aggregate_first', function(request, response) {
  response.render('pages/aggregate_first');
});

app.get('/aggregate_second', function(request, response) {
  response.render('pages/aggregate_second');
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
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


