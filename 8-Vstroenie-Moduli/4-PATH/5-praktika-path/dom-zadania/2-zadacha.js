// Задача 2: Изменение расширения файла
// Требования:

// У тебя есть путь к файлу с расширением .txt.
// Напиши функцию, которая меняет расширение этого файла на .json с использованием методов path.basename() и path.extname().
// С помощью метода path.join() объедини исходную директорию файла и новый файл с изменённым расширением.

const path = require("path");

const filePath = "/Users/bogdan/Desktop/node/file.txt";

const changeFileExtension = (filePath, newExtension) => {
    // Получаем имя файла без расширения
    const baseName = path.basename(filePath, path.extname(filePath));

    // Соединяем директорию файла с новым именем и расширением
    const newFilePath = path.join(
        path.dirname(filePath),
        `${baseName}${newExtension}`
    );

    return newFilePath;
};

const newFilePath = changeFileExtension(filePath, ".json");
console.log(newFilePath); // /Users/bogdan/Desktop/node/file.json
