const express = require('express');
const router = express.Router();

// require controller modules
const book_controller = require('../controllers/bookController');
const author_controller = require('../controllers/authorController');
const genre_controller = require('../controllers/genreController');
const book_instance_controller = require('../controllers/bookInstanceController');

// book routes
// GET catalog home page
router.get("/", book_controller.index);
// GET req for creating a book
router.get('/book/create', book_controller.book_create_get);
// POST req for creating book
router.post("/book/create", book_controller.book_create_post);
// GET req for deleting book
router.get("/book/:id/delete", book_controller.book_delete_get);
// POST req for deleting book
router.post("/book/:id/delete", book_controller.book_delete_post);
// GET req to update book
router.get('/book/:id/update', book_controller.book_update_get);
// POST req to update book
router.post('/book/:id/update', book_controller.book_update_post);
// GET req for one book
router.get('/book/:id', book_controller.book_detail);
// GET req for list of all book items
router.get('/books', book_controller.book_list);


