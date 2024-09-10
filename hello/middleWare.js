const express = require("express");
const app = express();
app.use(express.json());
const logger = (req, res, next) => {
  console.log(
    `${new Date(Date.now()).toLocaleString()} - ${req.method} - ${
      req.originalUrl
    }- ${req.protocol}- ${req.ip}`
  );
  next();
};

app.get("/", (req, res) => {
  res.send("welcome to the root");
});

//application level middleware

// app.use(logger);

app.get("/application-level", (req, res) => {
  res.send("logger called from application level");
});

//use middleware in particular route

const adminRoute = express.Router();

adminRoute.use(logger); // use logger middleware only in AdminPortal

app.use("/admin", adminRoute, (req, res) => {
  res.send("Admin Page ................");
});
// Admin sub route created
adminRoute.get("/dashboard", (req, res) => {
  res.send("welcome to admin dashboard");
});

app.listen(5555, () => {
  console.log("listening on port 5555");
});
