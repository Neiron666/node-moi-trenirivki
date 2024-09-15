// Задача 4: Извлечение имени файла без расширения
// Требования:

// Напиши функцию, которая принимает путь к файлу.
// Используй метод path.parse() для извлечения имени файла без расширения.
// Функция должна возвращать только имя файла, без его расширения.

const path = require("path");

const nameSeparator = (filePath) => {
    const separatedName = path.parse(filePath);
    return separatedName.name;
};

console.log(nameSeparator("/Users/bogdan/Desktop/node/index.js"));
