//Задание 2: Напишите скрипт, который сначала проверит, существует ли файл data.txt. Если файл существует, вызовите коллбэк-функцию, которая переименует его в backup.txt. Если файл не существует, вызовите другую коллбэк-функцию, которая создаст файл и запишет в него текст "Initial data". После выполнения этой операции выполните еще один коллбэк, который прочитает файл и выведет его содержимое в консоль.

const fs = require("fs");

//fs.constants — это объект, содержащий константы, используемые для указания прав доступа в fs.access
//fs.constants.F_OK: Проверяет, существует ли файл или директория. Это самая базовая проверка, которая просто удостоверяется в наличии файла, не проверяя права на чтение или запись.
//F_OK расшифровывается как "File OK" или "File exists" (файл в порядке или файл существует).
fs.access("./data.txt", fs.constants.F_OK, (err) => {
    if (err) {
        // Если файла нет, создаем его
        fs.writeFile("./data.txt", "Initial data", (err) => {
            if (err) {
                console.log("Error writing file:", err);
            } else {
                console.log("File created and written with 'Initial data'");
                fs.readFile("./data.txt", "utf-8", (err, data) => {
                    if (err) {
                        console.log("Error reading file:", err);
                    } else {
                        console.log("File contents:", data);
                    }
                });
            }
        });
    } else {
        // Если файл существует, переименовываем его
        fs.rename("./data.txt", "./backup.txt", (err) => {
            if (err) {
                console.log("Error renaming file:", err);
            } else {
                console.log("File was renamed to 'backup.txt'");
            }
        });
    }
});
