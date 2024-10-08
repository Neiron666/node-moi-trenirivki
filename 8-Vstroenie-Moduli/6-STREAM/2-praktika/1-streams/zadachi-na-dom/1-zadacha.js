// Задача 1: Чтение и запись в файлы с помощью потоков
// Описание: Напишите программу, которая будет читать текстовый файл построчно и записывать данные в другой файл, добавляя к каждой строке ее порядковый номер.
// Требования:
// Используйте fs.createReadStream() для чтения файла. Убедитесь, что файл существует и доступен.
// Используйте fs.createWriteStream() для создания нового файла.
// Каждая строка должна быть записана в новом файле с форматом: Номер строки: текст строки.
// Используйте событие data для чтения строк и finish для завершения записи.
// Добавьте обработку ошибок.

const fs = require("fs");

const existFilePath = "./zadachi.txt";
const destinationFilePath = "./zadachi-copied.txt";

const readStream = fs.createReadStream(existFilePath, "utf-8");
const writeStream = fs.createWriteStream(destinationFilePath);

let lineNumber = 0;

readStream.on("data", (chunk) => {
    const lines = chunk.split("\n");
    lines.forEach((line) => {
        writeStream.write(`${(lineNumber += 1)}. ${line}`);
    });
});

// Когда чтение завершено, мы завершаем запись
readStream.on("end", () => {
    writeStream.end(); // Завершение записи
});

writeStream.on("finish", () => {
    console.log(`File ${existFilePath} was copied and modified`);
});

writeStream.on("error", (err) => {
    console.error("Error oqured while writing file", err);
});

readStream.on("error", (err) => {
    console.error("Error oqured while reading file", err);
});
