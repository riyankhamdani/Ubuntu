const http = require("http");

const server = http.createServer((req, res) => {
  const urlPath = req.url;
  if (urlPath === "/overview") {
    res.end('Welcome to the "Technical Test" of DevOps');
  } else if (urlPath === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        product_id: "xyz12u3",
        product_name: "NginX",
      })
    );
  } else {
    res.end("Server bisa jalan");
  }
});

server.listen(3000, "localhost", () => {
  console.log("Listening for request");
});
