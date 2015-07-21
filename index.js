/* SET UP */
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)


/* CONFIGURATION */

// set the port of our application
// process.env.PORT lets the port be set by Heroku
app.set('port', (process.env.PORT || 5000));

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

mongoose.connect('mongodb://admin:password@apollo.modulusmongo.net:27017/p8osyxoX')

/* MODELS */
var Todo = mongoose.model('Todo', {
        text : String
    });
// var schema = new mongoose.Schema({ time: 'number', EngagementBoredomScore: 'number', FrustrationScore: 'number', ExcitementShortTermScore: 'number', ExcitementLongTermScore: 'number' });
// var HeadsetReading = mongoose.model('HeadsetReading', schema);

/* LISTEN */
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

/* ROUTING */
// get all todos
    app.get('/api/todos', function(req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text : req.body.text,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });
// /* ROUTING - RESTFUL API */
// // get all headset data
// app.get('/api/hsdata', function(request, response) {

//     // use mongoose to get all readings in the database
//     HeadsetReading.find(function(err, hsdata) {

//         // if there is an error retrieving, send the error. nothing after res.send(err) will execute
//         if (err)
//             console.log('some mongoose error')
//             response.send(err)

//         console.log('trying to send json response')
//         response.json(hsdata); // return all in JSON format
//     });
// });

// // create new data and send back all data after creation
// app.post('/api/hsdata', function(request, response) {

//     // create a new headset reading, information comes from AJAX request from Angular
//     HeadsetReading.create({
//         time: 0,
//         EngagementBoredomScore: 0,
//         FrustrationScore: 0,
//         ExcitementShortTermScore: 0,
//         ExcitementLongTermScore: 0,
//         done : false
//     }, function(err, hsreading) {
//         if (err)
//             response.send(err);

//         // get and return all the data after you create another
//         HeadsetReading.find(function(err, hsdata) {
//             if (err)
//                 response.send(err)
//             response.json(hsdata);
//         });
//     });

// });

/* ROUTING - VIEWS */
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



