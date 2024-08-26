// Задание 1: Создание очереди событий.

// Создайте экземпляр EventEmitter, который будет обрабатывать последовательные события. Реализуйте функционал, который поочередно выполняет три действия: создание файла, запись текста в файл и удаление файла. Каждое действие должно инициировать следующее событие.

import { EventEmitter } from "events";
import fs from "fs";

const fileEmitter = new EventEmitter();

fs.writeFile("./file1.txt", "File 1 content\n", () => {
    fileEmitter.emit("writeComplete");
});

fileEmitter.on("writeComplete", () => {
    console.log("file1.txt was written");
    fs.appendFile("./file1.txt", "one more line", () => {
        fileEmitter.emit("appendComplete");
    });
});

fileEmitter.on("appendComplete", () => {
    console.log("file1.txt was Appended");
    fs.unlink("./file1.txt", () => {
        fileEmitter.emit("fileDeleted");
    });
});

fileEmitter.on("fileDeleted", () => {
    console.log("file1.txt was deleted");
});
