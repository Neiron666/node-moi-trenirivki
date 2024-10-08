// 1. Простой сервер для отдачи файлов
// Задание: Создай сервер, который будет отдавать статические файлы HTML, CSS и изображения. Для этого нужно создать отдельные маршруты (routes) для каждого типа файла.
// Что сделать:
// Создай несколько HTML-страниц, например, index.html, about.html.
// Добавь к ним CSS и изображения.
// Настрой сервер, чтобы он отдавал правильные MIME-типы для каждого файла (HTML, CSS, изображения).
// Проверяй правильность заголовков для каждого типа контента.

const http = require("http");
const fs = require("fs");

const PORT = 1000;

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
        fs.readFile("./index.html", (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "text/HTML");
                return res.end("Server error while loading HTML file");
            }
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/HTML");
            return res.end(data);
        });
    }
    if (req.method === "GET" && req.url === "/about") {
        fs.readFile("./about.html", (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "text/HTML");
                return res.end("Server error while loading HTML file");
            } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/HTML");
                return res.end(data);
            }
        });
    }
    if (req.method === "GET" && req.url === "/image") {
        fs.readFile("./public/tree-736885_1280.jpg", (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "image/jpeg");
                return res.end("Server error while loading image file");
            }
            res.statusCode = 200;
            res.setHeader("Content-Type", "image/jpeg");
            return res.end(data);
        });
    }
});

server.listen(PORT, () => {
    console.log(`server was launched on port ${PORT}`);
});
