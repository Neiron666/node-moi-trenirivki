// 5. Реализация простого API
// Задание: Создай API, которое будет отдавать данные в формате JSON по различным маршрутам.
// Что сделать:
// Реализуй маршруты для GET-запросов, которые возвращают JSON с различными данными (например, список пользователей, список товаров).
// Реализуй POST-запрос для добавления новых данных в массив на сервере (например, добавление нового пользователя).
// Создай простой HTML-файл с формой для отправки данных через POST-запрос на API.

const http = require("http");

const fs = require("fs");
const PORT = 5000;
const qs = require("querystring");

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/addProduct") {
        fs.readFile("./addProduct.html", (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "text/HTML");
                return res.end("<h1>Page not found</h1>");
            } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/HTML");
                return res.end(data);
            }
        });
    } else if (req.method === "POST" && req.url === "/addProduct") {
        if (
            req.headers["content-type"] === "application/x-www-form-urlencoded"
        ) {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk;
            });
            req.on("end", () => {
                fs.access("./savedProducts.txt", fs.constants.F_OK, (err) => {
                    if (err) {
                        fs.writeFile(
                            "./savedProducts.txt",
                            JSON.stringify(qs.parse(body)),
                            (err) => {
                                if (err) {
                                    // 500 - ошибка на сервере при записи файла
                                    res.statusCode = 500;
                                    res.setHeader("Content-Type", "text/plain");
                                    res.end("Error saving data");
                                } else {
                                    // Успешная запись данных, отправляем ответ
                                    res.statusCode = 200;
                                    res.setHeader("Content-Type", "text/HTML");
                                    // res.end("<h1>Data successfully saved</h1>");
                                    res.end();
                                }
                            }
                        );
                    } else {
                        fs.readFile("./savedProducts.txt", (err, data) => {
                            if (err) {
                                res.statusCode = 404;
                                res.setHeader("Content-Type", "text/HTML");
                                return res.end("<h1>Can't read rhe file</h1>");
                            } else {
                                res.statusCode = 200;
                                res.setHeader("Content-Type", "text/html");
                                return res.end("<h1>File not found</h1>");
                            }
                        });
                    }
                });
            });
        } else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/HTML");
            return res.end("<h1>Bad request</h1>");
        }
    }

    if (req.method === "GET" && req.url === "/products") {
        fs.readFile("./savedProducts.txt", (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.setHeader("Content-Type", "text/HTML");
                return res.end("<h1>The file Products is not found</h1>");
            } else {
                data = JSON.parse(data);
                const products = [...data];
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/HTML");
                products.map((product) => {
                    res.write(
                        `<div style="display: flex; flex-direction: column; align-items: center;font-size:10px; margin:10px; background-color: lightgray;"><p>product Name: ${product["product-name"]} </p><p>product Price: ${product.price} </p><p>product wishes: ${product.message} </p> <a href="/products">Click to add product</a></div>`
                    );
                });
                return res.end();
            }
        });
    }
    if (req.method === "GET" && req.url === "/users") {
        if (users.length > 0) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/HTML");
            users.map((user) => {
                res.write(
                    `<div style="display: flex; flex-direction: column; align-items: center;font-size:10px; margin:10px; background-color: lightgray;"><p>User Name: ${user["user-name"]} </p><p>User Email: ${user.email} </p><p>User Message: ${user.message} </p> <a href="/users">Click to add user</a></div>`
                );
            });
            return res.end();
        } else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/HTML");
            return res.end("<h1>Users not found</h1>");
        }
    }

    if (req.method === "POST" && req.url === "/addUser") {
    } else if (req.method === "GET" && req.url === "/") {
        fs.readFile("./index.html", (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "text/HTML");
                return res.end("<h1>Page not found</h1>");
            } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/HTML");
                return res.end(data);
            }
        });
    } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/HTML");
        return res.end("<h1>Page not found</h1>");
    }
});

server.listen(5000, () => {
    console.log(`server launched on port ${PORT}`);
});
