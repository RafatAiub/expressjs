const express = require("express");

const app = express();

app.use(express.json());

const books = [
  {
    id: "1",
    name: "let us C",
    price: 200,
  },
  {
    id: "2",
    name: "Creacking The Coding Interviews",
    price: 500,
  },
  {
    id: "3",
    name: "Advanced Java",
    price: 284,
  },
  {
    id: "4",
    name: "Advanced node js",
    price: 789,
  },
  {
    id: "5",
    name: "Stack learner",
    price: 1000,
  },
];

//"/books?query-param"
app.get("/books", (req, res) => {
  console.log(req.query);
  if (req.query.show === "all") {
    return res.json(books);
  }
  if (req.query.price == "500") {
    const result = books.filter((book) => book.price <= 500);
    return res.json(result);
  }

  if (req.query.price == "1000") {
    const result = books.filter((book) => book.price <= 1000);
    return res.json(result);
  }

  return res.json(books);
});

app.get("/", (req, res) => {
  return res.json(books);
});

app.post("/books", (req, res) => {
  const book = req.body;
  books.push(book);
  res.json(book);
});

app.listen(8000, () => {
  console.log("server is listening on port 8000");
});
