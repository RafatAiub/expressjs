const express = require("express");
const app = express();
app.use(express.json());

const loggerWrapper = (options) => {
  return (req, res, next) => {
    if (options.log) {
      console.log(
        `${new Date(Date.now()).toLocaleString()} - ${req.method} - ${
          req.originalUrl
        }- ${req.protocol}- ${req.ip}`
      );
    }
    throw new Error("oh!!!!! no error occure in this logger Middleware");
  };
};

const logger = (req, res, next) => {
  console.log(
    `${new Date(Date.now()).toLocaleString()} - ${req.method} - ${
      req.originalUrl
    }- ${req.protocol}- ${req.ip}`
  );
  next();
  //   throw new Error("oh!!!!! no error occure in this logger Middleware");
};

const secondMiddleWare = (req, res, next) => {
  console.log("I am the another Middleware");
  next();
};

app.get("/", (req, res) => {
  res.send("welcome to the root");
});

//application level middleware

// app.use(logger);

app.get("/application-level", [logger, secondMiddleWare], (req, res) => {
  res.send("logger called from application level");
});

//use middleware in particular route

const adminRoute = express.Router();

// adminRoute.use(logger); // use logger middleware only in AdminPortal
adminRoute.use(loggerWrapper({ log: false }));

app.use("/admin", adminRoute, (req, res) => {
  res.send("Admin Page ................");
});
// Admin sub route created
adminRoute.get("/dashboard", (req, res) => {
  res.send("welcome to admin dashboard");
});

// to handle error create another middleware

const handleError = (err, req, res, next) => {
  // must be use the 4 parameter
  console.log("the error message:", err.message);
  res.status(500).send("Server Side Error!!");
};

adminRoute.use(handleError);

app.listen(5555, () => {
  console.log("listening on port 5555");
});
