// require("dotenv").config("../.env");

const express = require("express");
const middlewares = require("./middleware");
const { notFoundHandler, errorHandler } = require("./error");
const app = express();

app.use(middlewares);

// console.log(process.env.PORT);

app.use(require("./routes"));

// Error-handling middleware
// app.use((err, req, res, next) => {
//   res.status(err.status || 500).json({ error: err.message });
// });

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
