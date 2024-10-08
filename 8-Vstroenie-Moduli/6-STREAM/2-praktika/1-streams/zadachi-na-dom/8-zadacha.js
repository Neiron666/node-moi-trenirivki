// Задача 8: Анализ данных через поток
// Описание: Создайте поток Transform, который будет подсчитывать количество строк с определенным словом, заданным пользователем.
// Требования:
// Реализуйте поток Transform, который будет анализировать входящие данные.
// Программа должна принимать слово для поиска из командной строки.
// Каждая строка должна проверяться на наличие слова, и счетчик должен увеличиваться.
// По завершении работы потока выведите количество найденных строк в консоль.
// Обработайте возможные ошибки.

const { Transform } = require("stream");
const fs = require("fs");

const readFile = "./files/1-file.txt";

let counter = 0;
const readStream = fs.createReadStream(readFile, "utf-8");

let savedData = "";

readStream.on("data", (chunk) => {
    savedData += chunk;
});

readStream.on("end", () => {
    //СОЗДАЕМ ТРАНСФОРМИРУЮЩИЙ ПОТОК ПОСЛЕ ЗАВЕРШЕНИЯ ЗАПИСИ В ФАЙЛ!
    const analizeLinesStream = new Transform({
        transform: function (chunk, encoding, cb) {
            //буфер превращаем в строку и убираем лишние символа для дальнейшего использевани я в regex
            const inputLine = chunk.toString().trim();
            //создаем regex из ввода пользователя которое будет искать строго написанное слово
            const inputRegex = new RegExp(`\\b${inputLine}\\b`, "g");
            //.match - совпадение с regex вернет массив совпадений
            const matches = savedData.match(inputRegex);

            if (matches) {
                counter = matches.length;
            } else {
                counter = 0;
            }

            cb(
                null,
                `The iput string: (${inputLine}) found in the text ${counter} times \n`
            );
        },
    });
    //ввод текста будет позволен только после прочтения файла целиком
    process.stdin.pipe(analizeLinesStream).pipe(process.stdout);
});

readStream.on("error", (err) => {
    console.error("Error reading file:", err);
});
