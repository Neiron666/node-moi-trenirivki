// 3. Динамическая загрузка страницы с комментариями
// Задание: Используй сервер для создания страницы, которая динамически отображает список комментариев.
// Что сделать:
// Создай HTML-страницу, которая содержит форму для добавления комментариев.
// На сервере создай массив, который будет хранить добавленные комментарии.
// Реализуй GET-запрос, который будет динамически генерировать страницу с комментариями, добавленными через форму.
// Обновляй страницу автоматически после добавления нового комментария.

const http = require("http");
const fs = require("fs");
const qs = require("querystring");

const PORT = 5000;

const comments = [];

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
        fs.readFile("./index.html", (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "text/plain");
                res.end("Server error while loading HTML file");
            } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/HTML");
                res.end(data);
            }
        });
    }
    if (req.method === "GET" && req.url === "/comments") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/HTML");
        comments.map((coment) => {
            res.write(
                `<div style="display: flex; flex-direction: column; align-items: center;font-size:10px; margin:10px; background-color: lightgray;"><p>User Name: ${coment["user-name"]} </p><p>User Email: ${coment.email} </p><p>User Message: ${coment.message} </p> <a href="/">Click to add comment</a></div>`
            );
        });
        res.end();
    }

    if (req.method === "POST" && req.url === "/") {
        if (
            req.headers["content-type"] === "application/x-www-form-urlencoded"
        ) {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk;
            });
            req.on("end", () => {
                const newComment = qs.parse(body);
                comments.push(newComment);
                console.log(comments);
                res.statusCode = 302; // Статус редиректа
                res.setHeader("Location", "/comments"); // Перенаправляем на страницу с данными
                res.end();
            });
        }
    }
});

server.listen(PORT, () => {
    console.log(`server launched on ${PORT}`);
});
