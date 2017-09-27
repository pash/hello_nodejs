var express = require('express')
    mongoose = require('mongoose')
    bodyParser = require('body-parser');

// if bookAPI doesn't exist, it'll create it for you
var db;

if(process.env.ENV == 'Test') {
  db = mongoose.connect('mongodb://localhost/bookAPI_test', {
    useMongoClient: true // http://mongoosejs.com/docs/connections.html#use-mongo-client
  });
} else {
  db = mongoose.connect('mongodb://localhost/bookAPI', {
    useMongoClient: true // http://mongoosejs.com/docs/connections.html#use-mongo-client
  });
}

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

// middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// don't forget to execute with () because we're returning a function
var bookRouter = require('./routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);

app.get('/', function(req, res) {
  res.send('Welcome to my API!');
});

app.listen(port, function() {
  console.log('Gulp is running on PORT: ' + port);
});

// this will allow supertest to execute on app
module.exports = app;
