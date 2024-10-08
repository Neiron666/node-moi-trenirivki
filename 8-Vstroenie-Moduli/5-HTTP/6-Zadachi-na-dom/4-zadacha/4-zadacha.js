// 4. Скачивание файла с сервера
// Задание: Реализуй сервер, который позволит пользователям скачивать файлы.
// Что сделать:
// Создай на сервере несколько файлов для скачивания (например, текстовые файлы, изображения).
// Реализуй маршрут для скачивания файла по ссылке.
// Когда пользователь перейдёт по определённому маршруту (например, /download?file=myfile.txt), сервер должен передать файл на клиент с корректными заголовками для скачивания.

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 5000;

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/download/file.txt") {
        const filePath = path.join(__dirname, "./public/example.txt");

        res.writeHead(200, {
            "Content-Type": "application/octet-stream", // Указывает на бинарный файл
            "Content-Disposition": 'attachment; filename="example.txt"', // Указывает браузеру, что это файл для скачивания
        });

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Error downloading the file");
            } else {
                res.write(data);
                res.end();
            }
        });
    }
    if (req.method === "GET" && req.url === "/download/file.jpg") {
        const filePath = path.join(__dirname, "./public/examplepic.jpg");

        res.writeHead(200, {
            "Content-Type": "application/octet-stream", // Указывает на бинарный файл
            "Content-Disposition": 'attachment; filename="examplepic.jpg"', // Указывает браузеру, что это файл для скачивания
        });

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Error downloading the file");
            } else {
                res.write(data);
                res.end();
            }
        });
    }
    if (req.method === "GET" && req.url === "/") {
        // res.statusCode = 200;
        // res.setHeader("Content-Type", "text/plain");
        // res.end("Hello there");
        fs.readFile("./index.html", (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Page not found");
            } else {
                res.writeHead(200, { "Content-Type": "text/HTML" });
                res.write(data);
                res.end();
            }
        });
    }
});

server.listen(PORT, () => {
    console.log(`server launched on port ${PORT}`);
});
