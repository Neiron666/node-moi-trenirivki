// Задача 5: Создание простого HTTP-сервера с потоками
// Описание: Создайте HTTP-сервер, который читает большой текстовый файл с помощью потоков и отправляет его содержимое клиенту.
// Требования:
// Используйте http.createServer() для создания сервера.
// При запросе на корневой URL (/) используйте fs.createReadStream() для чтения HTML-файла.
// Установите правильные заголовки для типа контента (text/html).
// Используйте pipe() для передачи данных клиенту.
// Добавьте обработку ошибок и вывод сообщений в консоль для отладки.

const http = require("http");
const fs = require("fs");

const PORT = 5000;
const htmlFilePath = "./index.html";

const server = http.createServer((req, res) => {
    const readStream = fs.createReadStream(htmlFilePath);
    readStream.on("end", () => {
        console.log(`HTML file ${htmlFilePath} was readed`);
    });
    readStream.on("error", (err) => {
        console.error(`Error reading HTML file ${htmlFilePath}`, err);
        res.statusCode = 500;
        res.end("Server Error: Unable to load the requested page");
    });

    if (req.method === "GET" && req.url === "/") {
        res.setHeader("Content-Type", "text/html");
        res.statusCode = 200;
        // Чтение файла и отправка клиенту
        readStream.pipe(res);
    } else {
        res.statusCode = 404;
        res.end("Page Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`server was launched on port ${PORT}`);
});
