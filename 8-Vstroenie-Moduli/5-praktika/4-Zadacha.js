//Задание 4: Напишите скрипт, который создаст несколько файлов (например, file1.txt, file2.txt, file3.txt) с разными текстами внутри. После создания каждого файла вызовите коллбэк-функцию, которая проверит успешность операции и приступит к созданию следующего файла. После создания всех файлов вызовите финальный коллбэк, который прочитает все эти файлы по очереди и объединит их содержимое в один файл с именем combined.txt.

const fs = require("fs");

let innerContent = "";

const files = ["file1.txt", "file2.txt", "file3.txt"];

const readingWritingFn = (index) => {
    if (index < files.length) {
        fs.readFile(files[index], "utf-8", (err, data) => {
            if (err) {
                console.log("Error when try to read file", files[index], err);
            } else {
                innerContent += data + "\n";
                readingWritingFn(index + 1);
            }
        });
    } else {
        fs.writeFile("combined.txt", innerContent, (err) => {
            if (err) {
                console.log("Error when try to read combined.txt file", err);
            } else {
                console.log("Success fineshed writing combined file");
            }
        });
    }
};

fs.writeFile("file1.txt", "Hi from file1.txt", (err) => {
    if (err) {
        console.log("Error writting file 1", err);
    } else {
        fs.writeFile("file2.txt", "Hi from file2.txt", (err) => {
            if (err) {
                console.log("Error writting file 2", err);
            } else {
                fs.writeFile("file3.txt", "Hi from file3.txt", (err) => {
                    if (err) {
                        console.log("Error writting file 3", err);
                    } else {
                        readingWritingFn(0);
                    }
                });
            }
        });
    }
});
