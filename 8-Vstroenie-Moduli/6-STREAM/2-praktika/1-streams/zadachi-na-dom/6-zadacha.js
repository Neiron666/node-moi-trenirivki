// Задача 6: Чтение больших файлов построчно
// Описание: Реализуйте программу, которая читает большой текстовый файл построчно с использованием потоков.
// Требования:
// Используйте fs.createReadStream() для чтения файла.
// Обработайте данные в событии data, разбивая на строки и выводя их в консоль.
// Убедитесь, что программа корректно обрабатывает конец файла через событие end.
// Добавьте обработку ошибок для чтения файла.

const fs = require("fs");
const path = require("path");

const bigFileDir = "./big-file";
const bigFileName = "big-File.txt";
const fullFilePAth = path.join(bigFileDir, bigFileName);

if (!fs.existsSync(bigFileDir)) {
    try {
        console.warn(
            `There is no such directory as ${bigFileDir}, please wait while program will make it...`
        );
        fs.mkdirSync(bigFileDir);
        console.log(`The directory ${bigFileDir} was maked`);
        const writeStream = fs.createWriteStream(fullFilePAth);
        for (let i = 1; i <= 1000; i++) {
            let line = `${i}.This is automaticaly made line number ${i}. `;
            writeStream.write(line);
        }
    } catch (error) {
        console.error(
            `Error ocured while writing directory ${fullFilePAth}`,
            error
        );
    }
}

const readingFileStream = fs.createReadStream(fullFilePAth, "utf-8");
let data = "";

readingFileStream.on("data", (chunk) => {
    data += chunk;
    const lines = data.split(". ");
    lines.forEach((line) => {
        console.log(line);
    });
});

readingFileStream.on("end", () => {
    console.log("Reading fileStrem finished");
});

readingFileStream.on("error", (err) => {
    console.error(`Error readin file`, err);
});
