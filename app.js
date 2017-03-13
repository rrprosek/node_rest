var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://192.168.178.49/bookAPI'); // eslint-disable-line


var app = express();
var port = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routing
var bookRouter = require('./routes/bookRoutes')();

app.use('/api', bookRouter);

//Simple Route
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

//Webserver Listener
app.listen(port, function () {
    console.log('Gulp is running my app on PORT: ' + port);
})