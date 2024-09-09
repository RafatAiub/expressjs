const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("<h1>welcome Page</h1>");
    res.statusCode = 200;
    res.end();
  } else if (req.url === "/say") {
    res.write("<h1>nothing to say!!!</h1>");
    res.statusCode = 200;
    res.end();
  } else {
    res.write("<h1>404 Not Found</h1>");
    res.statusCode = 400;
    res.end();
  }
});

server.listen(8000, () => {
  console.log("server is listening on port 8000");
});
