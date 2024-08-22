//Задание 3: Создайте скрипт, который создаст новый файл с именем log.txt. После успешного создания вызовите коллбэк-функцию, которая запишет в него текущую дату и время. Затем вызовите коллбэк, который добавит в файл строку "Operation completed". После завершения всех записей выполните коллбэк, который переименует файл в operation-log.txt.

const fs = require("fs");

fs.writeFile("./log.txt", "", (err) => {
    if (err) {
        console.log("Error writing file:", err);
    } else {
        const localTime = new Date().toLocaleString();
        fs.appendFile("./log.txt", `${localTime}\n`, (err) => {
            if (err) {
                console.log("Error appending date and time:", err);
            } else {
                fs.appendFile("./log.txt", "Operation completed\n", (err) => {
                    if (err) {
                        console.log("Error appending operation message:", err);
                    } else {
                        fs.rename("./log.txt", "./operation-log.txt", (err) => {
                            if (err) {
                                console.log("Error renaming file:", err);
                            } else {
                                console.log(
                                    "File renamed to 'operation-log.txt'"
                                );
                            }
                        });
                    }
                });
            }
        });
    }
});
