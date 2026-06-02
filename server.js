const http = require("http");
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const port = Number(process.env.PORT || 8080);
const host = "127.0.0.1";

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg"
};

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${host}`);
  let pathname = decodeURIComponent(url.pathname);

  if (pathname === "/") {
    pathname = "/index.html";
  }

  const filePath = path.resolve(root, `.${pathname}`);

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": contentTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream"
    });
    response.end(data);
  });
});

server.listen(port, host, () => {
  console.log(`Serving LORD Law website at http://${host}:${port}`);
});
