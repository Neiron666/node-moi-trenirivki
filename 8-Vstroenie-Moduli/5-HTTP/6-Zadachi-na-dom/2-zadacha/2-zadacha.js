// 2. Форма с обработкой на сервере
// Задание: Создай HTML-форму, которая будет отправлять данные на сервер методом POST, а сервер будет сохранять их в память или в файл.
// Что сделать:
// Создай форму с несколькими полями (например, имя, комментарий, email).
// Настрой сервер для обработки данных из формы.
// Реализуй маршруты для метода POST, чтобы сервер получал данные формы и сохранял их (в массив или файл).
// После успешной отправки формы, сервер должен возвращать страницу с подтверждением или ошибкой, если что-то пошло не так.

const http = require("http");
const fs = require("fs");
const qs = require("querystring");

// const comments = [
//     {
//         "user-name": "Billi",
//         email: "neiron@example.com",
//         message: "Hello there",
//     },
// ];

// const comments = fs.readFile("./savedData.txt", (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         data = JSON.parse(data);
//         console.log("data from comments", typeof data);
//         console.log("data from comments", data);
//         return data;
//     }
// });

const PORT = 5000;

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
        fs.readFile("./index.html", (err, data) => {
            if (err) {
                //500-ошибка на сервере
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
        fs.readFile("./savedData.txt", (err, data) => {
            data = JSON.parse(data);
            if (err) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "text/plain");
                res.end("Server error, fould to read data");
            } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/HTML");
                res.write(`<h1>Here is a users data</h1>`);
                data.map((coment) => {
                    res.write(
                        `<div style="display: flex; flex-direction: column; align-items: center;font-size:10px; margin:10px; background-color: lightgray;"><p>User Name: ${coment["user-name"]} </p><p>User Email: ${coment.email} </p><p>User Message: ${coment.message} </p></div>`
                    );
                });

                res.end(`
    <a href="/" style="display: inline-block; padding: 10px 20px; color: white; background-color: blue; text-decoration: none; border-radius: 5px;">Submit one more comment</a>
`);
            }
        });
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
                fs.readFile("./savedData.txt", "utf-8", (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        const comments = JSON.parse(data);
                        const newComment = qs.parse(body);
                        comments.push(newComment); // Добавляем новый комментарий

                        // Преобразуем массив комментариев обратно в строку
                        //null -преобразование выполняется как обычно, без фильтрации ключей (то есть все ключи объекта будут включены)
                        //2 - определяет количество пробелов для отступов в результирующей строке JSON
                        const updatedData = JSON.stringify(comments);

                        fs.writeFile("./savedData.txt", updatedData, (err) => {
                            if (err) {
                                // 500 - ошибка на сервере при записи файла
                                res.statusCode = 500;
                                res.setHeader("Content-Type", "text/plain");
                                res.end("Error saving data");
                            } else {
                                // Успешная запись данных, отправляем ответ
                                res.statusCode = 302; // Статус редиректа
                                res.setHeader("Location", "/comments"); // Перенаправляем на страницу с данными
                                // res.end("<h1>Data successfully saved</h1>");
                                res.end();
                            }
                        });
                    }
                });
            });
        }
    }
});

server.listen(PORT, () => {
    console.log(`server launched on port ${PORT}`);
});
