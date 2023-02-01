const Author = require("../models/author");
const Book = require("../models/book");
const async = require("async");
const { body, validationResult } = require('express-validator');

// display list of all authors
exports.author_list = (req, res, next) => {
  Author.find()
    .sort([["family_name", "ascending"]])
    .exec((err, list_authors) => {
      if (err) {
        return next(err)
      }
      res.render("author_list", {
        title: "Author List",
        author_list: list_authors,
      })
    })
}

// display detail page for specific author
exports.author_detail = (req, res, next) => {
  async.parallel(
    {
      author(callback) {
        Author.findById(req.params.id).exec(callback);
      },
      books(callback) {
        Book.find({ author: req.params.id }, "title summary").exec(callback);
      }
    }, 
    (err, result) => {
      if (err) {
        return next(err);
      }
      if (result.author == null) {
        const err = new Error("Author not found!");
        err.status = 404;
        return next(err);
      }
      res.render("author_detail", { 
        title: "Author Detail:", 
        author: result.author, 
        books: result.books 
      })
    }
  )
}

// display author create form on GET
exports.author_create_get = (req, res, next) => {
  res.render("author_form", { title: "Add Author" });
}

// handle author create on POST
exports.author_create_post = [
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),
  body("date_of_birth", "Invalid date of birth")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of death")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
    // process the request after validation & sanitization
  (req, res, next) => {
    // extract the errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // ie there are errors; render form again with sanitized values and error messages
      res.render("author_form", { title: "Add Author", author: req.body, errors: errors.array()});
      return;
    }
    // data from form is valid
    // create a new author w/ clean data
    const author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    });
    author.save((err) => {
      if (err) {
        return next(err);
      }
      // successful -> redirect to new author url
      res.redirect(author.url);
    })
  }
]

// display author delete form on GET
exports.author_delete_get = (req, res, next) => {
  async.parallel(
    {
      author(callback) {
        Author.findById(req.params.id).exec(callback);
      },
      authors_books(callback) {
        Book.find({ author: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.author == null) {
        // no results
        res.redirect("/catalog/authors");
      }
      res.render("author_delete", {
        title: "Delete Author",
        author: results.author,
        author_books: results.authors_books,
      });
    }
  )
}

// display author delete on POST
exports.author_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Author delete POST");
}

// display author update on GET
exports.author_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Author update GET");
}

// display author update on POST
exports.author_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Author update POST");
}