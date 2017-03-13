var express = require('express');

var routes = function (Book) {
    var bookRouter = express.Router();

    bookRouter.route('/')
        .post(function (req, res) {
            var book = new Book(req.body);
            book.save();
            console.log("---\nSucess: saved _id : " + book._id);
            res.status(201).send(book);
        })
        .get(function (req, res) {

            //Allowed Filter Settings
            var query = {};
            if (req.query.genre) query.genre = req.query.genre;
            if (req.query.title) query.title = req.query.title;
            if (req.query.read) query.read = req.query.read;
            if (req.query.author) query.author(req.query.author);

            //Filtering by query
            Book.find(query, function (err, books) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    if (Object.keys(query).length == 0) {
                        console.log('---\nSucess: /api/Books was called without filters.');
                    } else {
                        console.log('---\nSucess: /api/Books was called with the following filters:');
                        for (var key in query) {
                            console.log('   Filter: ' + key + ' : ' + query[key]);
                        }
                    }
                    res.json(books);
                }
            });
        });

    bookRouter.route('/:bookId')
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

    return bookRouter;
};

module.exports = routes;

