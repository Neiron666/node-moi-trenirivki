const express = require("express");

//создаем обьект app - когда вызоваем функцию express();
const app = express();
//next - нужен для того что бы функция могла перейти к следующему обработчику после запятой
const firstHandler = (req, res, next) => {
    console.log("First handler");
    next();
};

const secondHandler = (req, res) => {
    console.log("Second handler");
    res.send("Response from EXPRESS");
};

app.get("/", firstHandler, secondHandler);

app.listen(5000, () => {
    console.log("Server was launched on port 5000");
});
