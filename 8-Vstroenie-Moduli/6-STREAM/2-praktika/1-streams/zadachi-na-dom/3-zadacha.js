// Задача 3: Параллельное копирование файлов
// Описание: Напишите программу, которая копирует все файлы из одной директории в другую с использованием потоков.
// Требования:
// Используйте fs.readdir() для чтения содержимого исходной директории.
// Используйте fs.createReadStream() и fs.createWriteStream() для каждого файла.
// Создайте целевую директорию, если она не существует, с помощью fs.mkdirSync().
// Добавьте логирование для каждого успешно скопированного файла.
// Обработайте возможные ошибки чтения или записи файлов.

const fs = require("fs");
const path = require("path");

const sourceDir = "./files";
const destinationDir = "./copied-files";

if (!fs.existsSync(sourceDir)) {
    fs.mkdirSync(sourceDir);

    for (let i = 1; i <= 20; i++) {
        const writeStream = fs.createWriteStream(
            path.join(sourceDir, `${i}-file.txt`)
        );

        for (let j = 1; j <= 20; j++) {
            writeStream.write(
                `This is a line number ${j} in automaticaly generated file\n`
            );
        }
    }
}

if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir);
    console.log(`directory ${destinationDir} was created`);
}

fs.readdir(sourceDir, (err, fileNames) => {
    if (err) {
        console.error("Can't read the source direction");

        process.exit(1);
    }

    fileNames.forEach((fileName, index) => {
        const sourceFilePath = path.join(sourceDir, fileName);
        const destinationFilePath = path.join(
            destinationDir,
            `${index + 1}. ${fileName}`
        );
        const readFileStream = fs.createReadStream(sourceFilePath);
        const writeFileStream = fs.createWriteStream(destinationFilePath);
        readFileStream.pipe(writeFileStream);

        writeFileStream.on("finish", () => {
            console.log(`File ${fileName} was copied`);
        });

        // Обрабатываем ошибки при чтении файла
        readFileStream.on("error", (err) => {
            console.error(`Error while reading file ${fileName}:`, err);
        });

        // Обрабатываем ошибки при записи файла
        writeFileStream.on("error", (err) => {
            console.error(`Error while writing file ${fileName}:`, err);
        });

        writeFileStream.on("finish", () => {
            console.log(`File ${fileName} was copied successfully`);
        });
    });
});
