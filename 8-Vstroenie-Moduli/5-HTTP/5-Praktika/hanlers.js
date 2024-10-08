const fs = require("fs");
const qs = require("querystring");
const comments = require("./data");

function getHome(req, res) {
    fs.readFile("./files/comment-form.html", (err, data) => {
        if (err) {
            //500-ошибка на сервере
            res.statusCode = 500;
            res.setHeader("Content-Type", "text/HTML");
            res.end("Server error while loading HTML file");
        } else {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/HTML");
            res.end(data);
        }
    });
}

function getHTML(req, res) {
    res.setHeader("Content-Type", "text/HTML");
    res.statusCode = 200;
    res.write("<html><body><div>");
    res.write("<h1>Greetings from the HTTP server</h1>");
    res.write("</div></body></html>");
    res.end();
}

function getComments(req, res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(comments));
}
function postComment(req, res) {
    //этот заголовок будем добавлять для всех ответов в этой функции
    res.setHeader("Content-Type", "text/plain");

    if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            try {
                const comment = qs.parse(body);
                comment.id = parseInt(comment.id);
                comments.push(comment);
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/html");
                res.write("<h1>Comment data was received</h1>");
                res.write("<a href='/'>Submit one more comment</a>");
                res.end("");
            } catch (error) {
                res.statusCode = 400;
                res.end("Invalid Form data");
            }
        });
    }

    //проверяем если тип контента JSON
    else if (req.headers["content-type"] === "application/json") {
        let commentJSON = "";
        //такие событие как data и end создаються автоматически модулем HTTP
        req.on("data", (chunk) => {
            commentJSON += chunk;
        });
        req.on("end", () => {
            //блок try/catch используем если возникнет ошибка при конвертации ответа JSON
            try {
                //JSON.parse(commentJSON) - конвертируем строку JSON в обьект
                comments.push(JSON.parse(commentJSON));
                res.statusCode = 200;
                res.end("Comment data was received");
            } catch (error) {
                res.statusCode = 400;
                res.end("Invalid JSON");
            }
        });
    } else {
        res.statusCode = 400;
        res.end("Data must be in the JSON format or as form");
    }
}

function getText(req, res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("This is plain text");
}

function handleNotFound(req, res) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Page not found!</h1>");
}

module.exports = {
    getHTML,
    getText,
    getComments,
    handleNotFound,
    postComment,
    getHome,
};
