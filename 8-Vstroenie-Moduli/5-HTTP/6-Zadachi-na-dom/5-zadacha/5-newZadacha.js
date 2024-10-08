// 5. Реализация простого API
// Задание: Создай API, которое будет отдавать данные в формате JSON по различным маршрутам.
// Что сделать:
// Реализуй маршруты для GET-запросов, которые возвращают JSON с различными данными (например, список пользователей, список товаров).
// Реализуй POST-запрос для добавления новых данных в массив на сервере (например, добавление нового пользователя).
// Создай простой HTML-файл с формой для отправки данных через POST-запрос на API.

const http = require("http");
const fs = require("fs");
const qs = require("querystring");

const PORT = 5000;

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
        fs.readFile("./index.html", (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "text,HTML");
                return res.end("<h1>Server error while loading HTML file</h1>");
            } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/HTML");
                return res.end(data);
            }
        });
    } else if (req.method === "GET" && req.url === "/addProductPage") {
        fs.readFile("./addProduct.html", (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "text,HTML");
                return res.end("<h1>Server error while loading HTML file</h1>");
            } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/HTML");
                return res.end(data);
            }
        });
    } else if (req.method === "GET" && req.url === "/addUserPage") {
        fs.readFile("./addUser.html", (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "text,HTML");
                return res.end("<h1>Server error while loading HTML file</h1>");
            } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/HTML");
                return res.end(data);
            }
        });
    } else if (req.method === "POST" && req.url === "/addNewProduct") {
        if (
            req.headers["content-type"] === "application/x-www-form-urlencoded"
        ) {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk;
            });

            req.on("end", () => {
                fs.readFile("./products.txt", "utf-8", (err, data) => {
                    const products = err ? [] : JSON.parse(data);
                    const newProduct = qs.parse(body);
                    products.push(newProduct);

                    const productsTxt = JSON.stringify(products);
                    fs.writeFile("./products.txt", productsTxt, () => {
                        // Переадресация на страницу с заказанными продуктами
                        res.statusCode = 302;
                        res.setHeader("Location", "/ordered-products");
                        return res.end(); // Завершение ответа после установки заголовков
                    });
                });
            });
        }
    } else if (req.method === "POST" && req.url === "/addNewUser") {
        if (
            req.headers["content-type"] === "application/x-www-form-urlencoded"
        ) {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk;
            });

            req.on("end", () => {
                fs.readFile("./users.txt", "utf-8", (err, data) => {
                    const users = err ? [] : JSON.parse(data);
                    const newUser = qs.parse(body);
                    users.push(newUser);

                    const usersTxt = JSON.stringify(users);
                    fs.writeFile("./users.txt", usersTxt, () => {
                        // Переадресация на страницу с заказанными продуктами
                        res.statusCode = 302;
                        res.setHeader("Location", "/users-list");
                        return res.end(); // Завершение ответа после установки заголовков
                    });
                });
            });
        }
    } else if (req.method === "GET" && req.url === "/users-list") {
        fs.readFile("./users.txt", "utf-8", (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "text/html");
                return res.end(
                    "<h1>Server error while loading HTML users file</h1>"
                );
            } else {
                const users = JSON.parse(data);
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/html");
                users.map((user) => {
                    res.write(
                        `<div style="display: flex; flex-direction: column; align-items: center;font-size:10px; margin:10px; background-color: lightgray;"><p>User Name: ${user["user-name"]} </p><p>User email: ${user.email} </p><p>User Message: ${user.message} </p></div>`
                    );
                });

                return res.end(`
    <a href="/addProductPage" style="display: inline-block; padding: 10px 20px; color: white; background-color: blue; text-decoration: none; border-radius: 5px;">Send one more user</a>
`);
            }
        });
    } else if (req.method === "GET" && req.url === "/ordered-products") {
        fs.readFile("./products.txt", "utf-8", (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "text/html");
                return res.end(
                    "<h1>Server error while loading HTML Products file</h1>"
                );
            } else {
                const products = JSON.parse(data);
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/html");
                products.map((product) => {
                    res.write(
                        `<div style="display: flex; flex-direction: column; align-items: center;font-size:10px; margin:10px; background-color: lightgray;"><p>Product Name: ${product["product-name"]} </p><p>Product Price: ${product.price} </p><p>Product Message: ${product.message} </p></div>`
                    );
                });

                return res.end(`
    <a href="/addProductPage" style="display: inline-block; padding: 10px 20px; color: white; background-color: blue; text-decoration: none; border-radius: 5px;">Send one more product request</a>
`);
            }
        });
    } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        return res.end("<h1>Page not found!</h1>");
    }
});

server.listen(PORT, () => {
    console.log(`server launched on port ${PORT}`);
});
