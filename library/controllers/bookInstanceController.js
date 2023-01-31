const BookInstance = require('../models/bookinstance');
const Book = require('../models/book');
const async = require('async');

// display list of all book instances
exports.bookinstance_list = (req, res, next) => {
  BookInstance.find()
    .populate("book")
    .exec((err, list_bookinstances) => {
      if (err) {
        return next(err);
      }
      res.render("bookinstance_list", {
        title: "Book Instance List",
        bookinstance_list: list_bookinstances,
      })
    })
}

// display detail page for a specific BookInstance.
exports.bookinstance_detail = (req, res, next) => {
  const batch = [];
  async.waterfall(
    [
      function bookI(callback) {
        BookInstance.findById(req.params.id)
          .populate("book")
          .exec(callback);
      },
      function author(results, callback) {
        batch.push(results);
        Book.findById(results.book._id)
          .populate("author") 
          .exec(callback)
      }
    ],
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (batch[0] == null) {
        const err = new Error("Book copy not found!");
        err.status = 404;
        return next(err);
      }
      if (results.author == null) {
        console.log('Problem fetching author')
      }
      console.log([results.author.url, batch[0]])
      res.render("bookinstance_detail", { title: `Copy: ${results.title}`, bookinstance: batch[0], author: results.author })
    })
}

// display BookInstance create form on GET.
exports.bookinstance_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance create GET");
}

// handle BookInstance create on POST.
exports.bookinstance_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance create POST");
}

// display BookInstance delete form on GET.
exports.bookinstance_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance delete GET");
}

// handle BookInstance delete on POST.
exports.bookinstance_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance delete POST");
}

// display BookInstance update form on GET.
exports.bookinstance_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
}

// handle bookinstance update on POST.
exports.bookinstance_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
}