// Задача 4: Компрессия файла
// Описание: Используйте модуль zlib для создания программы, которая сжимает файл и сохраняет его в новый файл с расширением .gz.
// Требования:
// Используйте fs.createReadStream() для чтения исходного файла.
// Создайте поток сжатия с помощью zlib.createGzip().
// Используйте fs.createWriteStream() для записи сжатого файла.
// Подключите потоки с помощью pipe().
// Добавьте обработку ошибок на всех этапах процесса.

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const sourceDir = "./files-to-zip";
const destinationDir = "./zipped-files";
const sourceFile = "./source-file.txt";
const destinationFile = "./zipped-file.txt.gz";

const sourceFilePath = path.join(sourceDir, sourceFile);
const destinationZippedPath = path.join(destinationDir, destinationFile);

function compressFileFn() {
    const readStream = fs.createReadStream(sourceFilePath);
    const gzipStream = zlib.createGzip();
    const writeZipStream = fs.createWriteStream(destinationZippedPath);

    readStream.on("error", (err) => {
        console.error("Error reading file", err);
    });
    gzipStream.on("error", (err) => {
        console.error("Error while zipping file", err);
    });
    writeZipStream.on("error", (err) => {
        console.error("Error writing compressed file", err);
    });

    readStream
        .pipe(gzipStream)
        .pipe(writeZipStream)
        .on("finish", () => {
            console.log(`File was compressed and saved as ${destinationFile}.`);
        });
}

function sourceFileCreateFn() {
    const writeStreamSourceFile = fs.createWriteStream(sourceFilePath);

    for (let i = 1; i <= 10; i++) {
        writeStreamSourceFile.write(
            `${i}. This is a line number ${i} in automaticaly generated file\n`
        );
    }

    writeStreamSourceFile.on("finish", () => {
        console.log(`${sourceFile} was created`);
        //компрессируем и записываем новый файл только после того как исходный файл закончил запись в файл
        compressFileFn();
    });

    writeStreamSourceFile.end();

    writeStreamSourceFile.on("error", (err) => {
        if (err) {
            console.error(`Can't write the sourceFilePath`, err);
        }
    });
}

if (!fs.existsSync(sourceDir)) {
    fs.mkdirSync(sourceDir);

    console.log("Distination directory was created");

    sourceFileCreateFn();
}

if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir);
}
