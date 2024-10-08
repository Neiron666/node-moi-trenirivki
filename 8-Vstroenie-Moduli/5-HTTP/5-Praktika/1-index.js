// Этот код создает простой HTTP сервер с использованием встроенного модуля http в Node.js, который отвечает на запросы клиента.

// Импортируем встроенный модуль 'http' для работы с HTTP сервером
const http = require("http");

// Указываем порт, на котором наш сервер будет прослушивать запросы
const PORT = 5000;

const comments = [
    { id: 100, text: "First comment", author: "Bogdan" },
    { id: 526, text: "Second comment", author: "Alice" },
    { id: 724, text: "Last comment", author: "Bob" },
];

// Создаем HTTP сервер с помощью метода 'http.createServer()'
// Функция внутри будет вызываться каждый раз, когда сервер получает запрос

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/html") {
        //Устанавливаем тип контента который передаеться клиенту от сервера, в данном случае это HTML документ
        res.setHeader("Content-Type", "text/HTML");

        //Отправляем клиенту статус код вручную
        res.statusCode = 200;

        res.write("<html><body><div>");
        res.write("<h1>Greetings from the HTTP server</h1>");
        res.write("</div></body></html>");

        // Отправляем клиенту результат с текстом "Greetings from the HTTP server" и завершаем ответ
        //после вызова метода res.end() нельзя больше модифицировать обьект res
        return res.end();
    }

    if (req.method === "GET" && req.url === "/comments") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(comments));
    }

    if (req.url === "/text") {
        res.statusCode = 200;

        //Устанавливаем тип контента который передаеться клиенту от сервера, в данном случае это текст
        res.setHeader("Content-Type", "text/plain");
        return res.end("This is plain text");
    }
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    return res.end("<h1>Page not found!</h1>");
});

// Говорим серверу прослушивать входящие запросы на указанном порту
// Когда сервер успешно запущен, выводим сообщение в консоль
server.listen(PORT, () => {
    console.log(`server was launched on port ${PORT}`);
});
