// Задача 1: Проверка относительности пути
// Требования:

// Напиши функцию, которая принимает два пути: один абсолютный и один относительный.
// Используй метод path.isAbsolute() для проверки, какой из них абсолютный, а какой относительный.
// Функция должна возвращать сообщение, подтверждающее тип каждого пути (абсолютный или относительный).

const path = require("path");

const filePath = "D:/Users/bogdan/Desktop/node/index.js";
const textFilePath = "./node/file.txt";

const checkPaths = (absolutePath, relativePath) => {
    const absoluteCheck = path.isAbsolute(absolutePath)
        ? "This path is absolute"
        : "This path is relative";
    const relativeCheck = path.isAbsolute(relativePath)
        ? "This path is absolute"
        : "This path is relative";

    return {
        absolutePath: absoluteCheck,
        relativePath: relativeCheck,
    };
};

const result = checkPaths(filePath, textFilePath);
console.log(result);
