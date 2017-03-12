var express = require('express');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://192.168.178.49/bookAPI'); // eslint-disable-line

var Book = require('./models/bookModel');
var app = express();
var port = process.env.port || 3000;

//Routing
var bookRouter = express.Router();

bookRouter.route('/Books')
    .get(function (req, res) {

        var query = [];

        if (req.query.genre) {
            query.genre = req.query.genre;
        }


        Book.find(query, function (err, books) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                if (query.genre) {
                    console.log('Sucess: /api/Books with genre:' + query.genre);
                }
                else {
                    console.log('Sucess: /api/Books');
                }

                res.json(books);
            }
        });
        // var responseJson = {hello: "This is my Api"};
        // res.json(responseJson);
    });


bookRouter.route('/Books/:bookId')
    .get(function (req, res) {
        console.log(req.params.bookId);
        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                console.log('Sucess: /api/Books/' + req.params.bookId);
                res.json(book);
            }
        });
    });

app.use('/api', bookRouter);

//Simple Route
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})




//Webserver Listener
app.listen(port, function () {
    console.log('Gulp is running my app on PORT: ' + port);
})