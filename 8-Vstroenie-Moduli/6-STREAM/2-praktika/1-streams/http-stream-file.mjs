import http from "http";
import fs from "fs";

const PORT = 5000;

const server = http.createServer((req, res) => {
    const filePath = "./files/index.html";
    //With streams
    if (req.url === "/" && req.method === "GET") {
        const readStream = fs.createReadStream(filePath);
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        readStream.pipe(res);
    }
    //Without streams. Мы полностью читаем файл и только потом шлем его клиенту
    if (req.url === "/no-stream" && req.method === "GET") {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "text/plain");
                res.end("Server error while reading HTML file");
            } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/HTML");
                res.end(data);
            }
        });
    }
});

server.listen(PORT, () => {
    console.log(`Server launched on port ${PORT}`);
});
