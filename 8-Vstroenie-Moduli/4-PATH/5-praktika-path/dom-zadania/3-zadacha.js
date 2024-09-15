// Задача 3: Объединение путей в один
// Требования:

// У тебя есть несколько частей пути: директория, поддиректория и имя файла.
// С помощью метода path.join() объедини эти части в полный путь к файлу.
// Функция должна принимать три строки (директория, поддиректория, имя файла) и возвращать полный путь.

const path = require("path");

const pathMaker = (directory, subDirectory, filename) => {
    return path.join(directory, subDirectory, filename);
};

console.log(pathMaker("/Users/bogdan/Desktop", "node", "index.js"));
