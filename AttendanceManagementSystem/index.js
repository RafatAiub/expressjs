const express = require("express");
const app = express();

app.use(express.json()); // use req to catch {}

const simpleLogger = (req, res, next) => {
  console.log(`${req.url} - ${req.method} -${new Date().toISOString()}`);
  next();
};

app.use(simpleLogger);

app.get("/", simpleLogger, (req, res, next) => { // call two time 
  res.json({ root: "This is the root route" });
});

app.get("/hello", (req, res, next) => {
  res.json({ message: "Welcome To EATL" });
});

app.get("/obj", (req, res) => {
  const obj = {
    name: "Rafat",
    email: "rafat@gmail.com",
  };
  console.log(req.body);

  res.json(obj);
});

app.listen(4000, () => {
  console.log("listening port 4000");
});
