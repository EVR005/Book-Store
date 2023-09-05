const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const books = require("./routes/api/books");

const app = express();

connectDB();

app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));
//app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api/books", books);

const port = 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));
