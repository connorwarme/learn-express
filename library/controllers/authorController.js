const Author = require("../models/author");

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
exports.author_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Author Detail: ${req.params.id}`);
}

// display author create form on GET
exports.author_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Author create GET");
}

// handle author create on POST
exports.author_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Author create POST");
}

// display author delete form on GET
exports.author_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Author delete GET");
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