// Задание 1: Копирование и изменение содержимого файла
// Прочитайте содержимое файла source.txt.
// Скопируйте содержимое файла в новый файл copy.txt.
// Дополните новый файл строкой "This is the appended text.".
// В конце выведите сообщение в консоль, подтверждающее успешное выполнение всех шагов.

const fs = require("fs/promises");

fs.writeFile("source.txt", "Content of file source.txt")
    .then(() => console.log("File source.txt was written"))
    .then(() => fs.readFile("source.txt", "utf-8"))
    .then((data) => {
        console.log("File source.txt was readed");
        return data;
    })
    .then((data) => fs.writeFile("copy.txt", data))
    .then(() => console.log("File source.txt was copied"))
    .then(() => fs.appendFile("./copy.txt", "\nThis is the appended text."))
    .then(() => console.log("File copy.txt was appended succesfuly "))
    .then(() => console.log("End of code cicle"))
    .catch((err) => console.log(err));
