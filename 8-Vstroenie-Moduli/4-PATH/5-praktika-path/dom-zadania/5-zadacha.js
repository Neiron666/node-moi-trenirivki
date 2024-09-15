// Задача 5: Абсолютный путь к файлу
// Требования:

// У тебя есть относительный путь к файлу, который находится внутри нескольких поддиректорий.
// Используй метод path.resolve() для преобразования относительного пути в абсолютный.
// Функция должна возвращать полный абсолютный путь к файлу.

const path = require("path");

const resolvePath = (relativePath) => {
    return path.resolve(relativePath);
};

console.log(resolvePath("./node/movie.mov"));
