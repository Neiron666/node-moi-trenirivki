const http = require("http");
const {
    getComments,
    getText,
    getHTML,
    handleNotFound,
    postComment,
} = require("./hanlers");

const PORT = 5000;

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/html") {
        return getHTML(req, res);
    }

    if (req.method === "GET" && req.url === "/comments") {
        return getComments(req, res);
    }
    if (req.method === "POST" && req.url === "/comments") {
        return postComment(req, res);
    }

    if (req.url === "/text") {
        getText(req, res);
    }
    return handleNotFound(req, res);
});

server.listen(PORT, () => {
    console.log(`server was launched on port ${PORT}`);
});
