// Задача 10: Логирование ошибок через потоки
// Описание: Напишите программу, которая читает текстовый файл и записывает сообщения об ошибках в лог-файл.
// Требования:
// Используйте fs.createReadStream() для чтения файла.
// Добавьте обработку ошибок, которая будет записывать сообщения в лог-файл через fs.createWriteStream().
// Убедитесь, что сообщения об ошибках записываются корректно, указывая тип ошибки и время.
// После завершения чтения файла выведите сообщение о завершении в консоль.
// Обработайте все возможные ошибки.

const fs = require("fs");
const path = require("path");

const fileDir = "./error-logs";
const sourcefilePath = path.join(fileDir, "./source.txt");
const distanationFilePath = path.join(fileDir, "./log-file.txt");

//Функция для добавления отметки времени к сообщениям
//Создаем штамп времени непосредственно в функции что бы время на момент создание совпадало
const addTimestamp = (message) =>
    `[${new Date().toLocaleString()}] ${message}\n`;

if (!fs.existsSync(fileDir)) {
    try {
        fs.mkdirSync(fileDir);
    } catch (error) {
        console.error(`Cant make direction:${fileDir}`, error);
    }
}

if (!fs.existsSync(sourcefilePath)) {
    const writeStream = fs.createWriteStream(sourcefilePath);
    for (let i = 1; i <= 100; i++) {
        writeStream.write(`${i}. This is automaticaly made line\n`);
    }

    writeStream.end();

    writeStream.on("finish", () => {
        console.log("The source file created succesfuly");
    });

    writeStream.on("error", (err) => {
        console.error(`Error while writing source file`, err);
    });
}

const readStream = fs.createReadStream(sourcefilePath, "utf-8");

// Создаем поток записи
// Важно: Используя флаг 'a', данные будут добавляться последовательно, но не будет перезаписываться весь файл.
const logStream = fs.createWriteStream(distanationFilePath, { flags: "a" }); // 'a' - для добавления данных в конец файла

readStream
    .on("error", (err) => {
        const errorMsg = addTimestamp(
            `Error reading file: ${sourcefilePath} - ${err.message}`
        );
        logStream.write(errorMsg); // Запись ошибки в лог-файл
        console.error(errorMsg); // Также выводим в консоль
    })

    // Здесь в обработчике события "open" используется метод .emit() для эмуляции ошибки в потоке чтения.
    // Это даст возможность проверить, как ошибка будет записана в лог-файл.

    // .on("open", () => {
    //     // Искусственно выбрасываем ошибку
    //     const fakeError = new Error("Artificially triggered error");
    //     readStream.emit("error", fakeError); // Прямо эмитируем событие "error"
    // })
    .pipe(logStream) // Пайпим поток данных в лог
    // .on("finish") указывает, что запись в файл завершена после того, как вызван метод writeStream.end().
    .on("finish", () => {
        console.log("Finished reading and logging errors (if any).");
    });

logStream.on("error", (err) => {
    console.error(addTimestamp("Error writing to log file"), err);
});
