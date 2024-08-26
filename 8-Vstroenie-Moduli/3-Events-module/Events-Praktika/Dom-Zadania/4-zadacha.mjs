// Задание 4: Обработка ошибок через события.

// Реализуйте обработку ошибок через события. Создайте EventEmitter, который будет следить за процессом чтения файла. Если файл не существует, инициируйте событие "error", которое будет выводить сообщение об ошибке в консоль и создавать файл с заданным именем.

import { EventEmitter } from "events";
import fs from "fs";

const fileEmitter = new EventEmitter();

const filePath = "./file";

// Обработка события "error"
fileEmitter.on("error", (err) => {
    console.error("Error occured", err.message);
    fs.writeFile(filePath, "File Content", (writeErr) => {
        if (writeErr) {
            console.error("Failed to write file:", writeErr.message);
        } else {
            console.log("File was created successfully.");
        }
    });
});

// Чтение файла и инициирование события "error" при ошибке
fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
        fileEmitter.emit("error", err); // Передаем объект ошибки
    } else {
        console.log(data);
    }
});
