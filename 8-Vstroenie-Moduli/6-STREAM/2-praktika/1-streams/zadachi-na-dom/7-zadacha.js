// Задача 7: Слияние файлов
// Описание: Напишите программу, которая читает два текстовых файла и объединяет их содержимое в третий файл.
// Требования:
// Используйте fs.createReadStream() для обоих файлов.
// Создайте новый файл с помощью fs.createWriteStream().
// Чередуйте чтение данных из обоих файлов и запись в целевой файл.
// Убедитесь, что данные из обоих файлов корректно записываются в целевой файл.
// Обработайте возможные ошибки на каждом этапе.

const fs = require("fs");
const path = require("path");

const firstFilePath = "./files/1-file.txt";
const secondFilePath = "./zadachi.txt";
const fileDir = "./fileDir-7";
const fileForWriting = "writed-file.txt";

if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir);
}

const finalFilePath = path.join(fileDir, fileForWriting);

const readFirstFileStream = fs.createReadStream(firstFilePath);
const readsecondFileStream = fs.createReadStream(secondFilePath);
const writeFileStream = fs.createWriteStream(finalFilePath);

// Обработка ошибок для первого читающего потока
readFirstFileStream.on("error", (err) => {
    console.error("Ошибка при чтении 1-file.txt:", err);
});

// Обработка ошибок для второго читающего потока
readsecondFileStream.on("error", (err) => {
    console.error("Ошибка при чтении zadachi.txt:", err);
});

// Обработка ошибок для пишущего потока
writeFileStream.on("error", (err) => {
    console.error("Ошибка при записи в writed-file:", err);
});

readFirstFileStream.pipe(writeFileStream, { end: false });

readFirstFileStream.on("end", () => {
    readsecondFileStream.pipe(writeFileStream);
});

writeFileStream.on("close", () => {
    console.log("The final file was created");
});
