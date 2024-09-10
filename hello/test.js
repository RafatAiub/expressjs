const express = require("express");
const app = express();

app.use(express.json());

const route = express.Router(); //not case sensitive
// const route = express.Router({
//   caseSensitive: true,
// });
app.use(route);
app.use(
  express.static(`${__dirname}/public/`, {
    index: "home.html",
  })
);

app.get("/", (req, res) => {
  const obj = {
    name: "Rafat",
    email: "rafat@gmail.com",
  };
  console.log("the obj body you pass", req.body);

  res.json(obj);
});

route.get("/about", (req, res) => {
  res.json(`Welcome To The About Page`);
});

app.get("*", (req, res) => {
  res.json(`404 NOT FOUND`);
});

app.listen(4000, () => {
  console.log("listening port 4000");
});
