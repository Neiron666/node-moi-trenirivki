// Задача 9: Трансляция видеофайлов с использованием потоков
// Описание: Напишите программу, которая читает видеофайл и передает его на клиент по HTTP.
// Требования:
// Создайте HTTP-сервер, который будет слушать на определенном порту.
// Используйте fs.createReadStream() для чтения видеофайла.
// При запросе на определенный URL передавайте видео с помощью res.pipe().
// Установите правильные заголовки для передачи видео (Content-Type).
// Обработайте возможные ошибки.

const http = require("http");
const fs = require("fs");

const PORT = 5000;

const server = http.createServer((req, res) => {
    const readStream = fs.createReadStream("VID_20200113_114133.mp4");

    readStream.on("error", () => {
        console.error("Error while reading video file");
    });

    if (req.method === "GET" && req.url === "/") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "video/mp4");
        readStream.pipe(res);
    } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end("<h1>Page not found</h1>");
    }
});

server.listen(PORT, () => {
    console.log(`Server launched on port ${PORT}`);
});
