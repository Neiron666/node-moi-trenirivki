// Задание 2: Работа с несколькими файлами
// Создайте три файла: file1.txt, file2.txt, и file3.txt.
// Запишите в каждый файл текст: "This is file 1", "This is file 2", "This is file 3".
// Прочитайте содержимое всех файлов, объедините его в одну строку и запишите в новый файл combined.txt.

const fs = require("fs/promises");

const filesArray = ["file1.txt", "file2.txt", "file3.txt"];

let combinedContent = "";

// Функция для создания файлов
const createFilesFn = (index, array) => {
    if (index < array.length) {
        return fs
            .writeFile(array[index], `This is file ${index + 1}`)
            .then(() => {
                console.log(`file${index + 1}.txt was created`);
                return createFilesFn(index + 1, array); // Возвращаем промис для следующего шага
            })
            .catch((err) => console.log(err));
    }
    return Promise.resolve(); // Когда все файлы созданы, возвращаем resolved промис
};

// Функция для объединения содержимого файлов
const combineFilesFn = (index, array) => {
    if (index < array.length) {
        return fs
            .readFile(array[index], "utf-8")
            .then((data) => {
                combinedContent += data + "\n"; // Добавляем содержимое файла к итоговой строке
                console.log(`file${index + 1}.txt was read`);
                return combineFilesFn(index + 1, array); // Переходим к следующему файлу
            })
            .catch((err) => console.log(err));
    } else {
        return fs
            .writeFile("combined.txt", combinedContent)
            .then(() => console.log("file combined.txt was created"))
            .catch((err) => console.log(err));
    }
};

// Выполняем сначала создание файлов, затем объединение
createFilesFn(0, filesArray)
    .then(() => combineFilesFn(0, filesArray))
    .catch((err) => console.log(err));
