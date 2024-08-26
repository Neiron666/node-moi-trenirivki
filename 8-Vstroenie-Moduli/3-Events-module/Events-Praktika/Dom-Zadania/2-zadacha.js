// Задание 2: Логирование многократных событий.

// Реализуйте EventEmitter, который будет регистрировать три разных слушателя для одного и того же события. Каждый слушатель должен записывать информацию в отдельный лог-файл. Проверьте, что все три слушателя срабатывают при вызове события.
const fs = require("fs");
const { EventEmitter } = require("events");

const myEmmiter = new EventEmitter();

myEmmiter.on("myEvent", () => {
    fs.writeFile("./first.txt", "first event listener", () => {
        console.log("first file was written");
    });
});

myEmmiter.on("myEvent", () => {
    fs.writeFile("./second.txt", "second event listener", () => {
        console.log("second file was written");
    });
});

myEmmiter.on("myEvent", () => {
    fs.writeFile("./third.txt", "third event listener", () => {
        console.log("third file was written");
    });
});

myEmmiter.emit("myEvent");
