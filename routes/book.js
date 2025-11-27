/**
 * @swagger
 * components:
 *  schemas:
 *    Books:
 *      type: object
 *      required:
 *         - title
 *         - author
 *      properties:
 *       id:
 *        type: integer
 *        description: The auto-generated id of the book
 *       title:
 *        type: string
 *        description: The title of the book
 *       author:
 *        type: string
 *        description: The author of the book
 */

/**
 * @swagger
 * tags:
 *  name: Books
 *  description: The books managing API
 * /books:
 *   get:
 *     summary: List all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Books'
 *
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Books'
 *     responses:
 *       201:
 *         description: Book created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Books'
 *       500:
 *         description: Server error
 * /books/{id}:
 *  get:
 *   summary: Get the book by id
 *   tags: [Books]
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: The book id
 *   responses:
 *    200:
 *     description: Book found
 *     content:
 *       application/json:
 *          schema:
 *            $ref: '#/components/schemas/Books'
 *    404:
 *     description: The book was not found
 *  put:
 *    summary: Update the book by the id
 *    tags: [Books]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: integer
 *        required: true
 *        description: The book id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *          $ref: '#/components/schemas/Books'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/Books'
 *      400:
 *        decription: The book was not found
 *      500:
 *        description: Some error happened
 *  delete:
 *   summary: Delete a book by id
 *   tags: [Books]
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: The book ID
 *   responses:
 *     200:
 *       description: The book was deleted
 *       content:
 *         application/json:
 *          schema:
 *           $ref: '#/components/schemas/Books'
 *     404:
 *       description: Book not found
 */



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
router.get("/books/:id", (req, res) => {
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
    const book = books.find(b => b.id == req.params.id);
    if(!book) return res.status(404).json({ message: "Book not found"});

    books = books.filter(b => b.id != req.params.id);
    res.json({ message: "Book deleted" });
});

module.exports = router;