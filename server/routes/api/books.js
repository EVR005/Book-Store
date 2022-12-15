const express = require("express");
const { count } = require("../../models/Book");
const router = express.Router();

const Book = require("../../models/Book");

router.get("/test", (req, res) => res.send("book route testing!"));

router.get("/:value/:option", (req, res) => {
  if (req.params.option == "publisher") {
    Book.find({ publisher: req.params.value })
      .then((books) => {
        res.json(books);
      })
      .catch((err) =>
        res.status(404).json({ nobooksfound: "No Books Found!" })
      );
  } else if (req.params.option == "title") {
    Book.find({ title: req.params.value })
      .then((books) => {
        res.json(books);
      })
      .catch((err) =>
        res.status(404).json({ nobooksfound: "No Books Found!" })
      );
  } else if (req.params.option == "bookid") {
    Book.find({ isbn: req.params.value })
      .then((books) => {
        res.json(books);
      })
      .catch((err) =>
        res.status(404).json({ nobooksfound: "No Books Found!" })
      );
  } else if (req.params.option == "published_date") {
    Book.find({ published_date: { $gt: Date.parse(req.params.value) } })
      .then((books) => {
        res.json(books);
      })
      .catch((err) =>
        res.status(404).json({ nobooksfound: "No Books Found!" })
      );
  } else if (req.params.option == "author") {
    Book.find({ author: req.params.value })
      .then((books) => {
        res.json(books);
      })
      .catch((err) =>
        res.status(404).json({ nobooksfound: "No Books Found!" })
      );
  }
});

router.get("/", (req, res) => {
  Book.find()
    .then((books) => res.json(books))
    .catch((err) => res.status(404).json({ nobooksfound: "No books found!" }));
});

router.get("/stats", async (req, res) => {
  let result = [];
  let date = new Date(
    new Date(new Date() - 7 * 60 * 60 * 24 * 1000).toISOString()
  );
  await Book.aggregate([
    {
      $match: {
        published_date: {
          $gt: date,
        },
      },
    },
    { $count: "recently_published" },
  ])
    .then((arg) => {
      result.push(arg[0]);
    })
    .catch((err) => res.json({ message: "stat fetch failed" }));

  await Book.aggregate([
    {
      $match: {
        updated_date: {
          $gt: date,
        },
      },
    },
    { $count: "recently_updated" },
  ])
    .then((arg) => {
      result.push(arg[0]);
    })
    .catch((err) => res.json({ message: "stat fetch failed" }));

  await Book.aggregate([
    { $group: { _id: "$publisher", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 },
  ])
    .then((arg) => result.push(arg[0]))
    .catch((err) => res.json({ message: "stat fetch failed" }));

  await Book.aggregate([
    { $group: { _id: "$author", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 },
  ])
    .then((arg) => {
      result.push(arg[0]);
    })
    .catch((err) => res.json({ message: "stat fetch failed" }));

  await Book.aggregate([
    { $sort: { published_date: 1 } },
    { $limit: 1 },
    { $project: { title: 1, published_date: 1 } },
  ])
    .then((arg) => result.push(arg[0]))
    .catch((err) => res.json({ message: "stat fetch failed" }));

  await Book.aggregate([
    { $sort: { published_date: -1 } },
    { $limit: 1 },
    { $project: { title: 1, published_date: 1 } },
  ])
    .then((arg) => result.push(arg[0]))
    .catch((err) => res.json({ message: "stat fetch failed" }));
  res.json({ query_results: result });
});

router.get("/:id", (req, res) => {
  Book.findById(req.params.id)
    .then((book) => res.json(book))
    .catch((err) => res.status(404).json({ nobooksfound: "No Books found!" }));
});

router.post("/", (req, res) => {
  console.log(req.body);
  Book.create(req.body)
    .then((book) => res.json({ msg: "Book added successfully" }))
    .catch((err) => res.status(400).json({ error: "Unable to add this book" }));
});

router.put("/:id", (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then((book) => res.json({ msg: "Updated Successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the database" })
    );
});

router.delete("/:id", (req, res) => {
  Book.findByIdAndRemove(req.params.id)
    .then((book) => res.json({ msg: "Book entry deleted successfully!" }))
    .catch((err) => res.json({ error: "No such book!" }));
});

module.exports = router;
