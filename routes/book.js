const express = require("express");
const router = express.Router();

// In-memory array for demo
let books = [
    { id:1, title: "Book One", author: "Author One"},
];

// CREATE
router.post("/books", (req,res) => {
    const { title, author } = req.body;
    const newBook = {id:books.length + 1, title, author};
    books.push(newBook);
    res.status(201).json(newBook);
})

// READ ALL
router.get("/books", (req, res) => {
    res.json(books);
});

// READ ONE
router.get("books/:id", (req, res) => {
    const book = books.find(b => b.id == req.params.id);
    if(!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
});

router.put("/books/:id", (req, res) => {
    const book = books.find(b => b.id == req.params.id);
    if(!book) return res.status(404).json({ message: "Book not found" });

    const { title, author } = req.body;
    book.title = title ?? book.title;
    book.author = author ?? book.author;

    res.json(book);
});

// DELETE
router.delete("/books/:id", (req, res) => {
    books = books.filter(b => b.id != req.params.id);
    res.json({ message: "Book deleted" });
});

module.exports = router;