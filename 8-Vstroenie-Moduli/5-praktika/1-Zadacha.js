//Задание 1: Напишите скрипт, который создаст новый файл с именем notes.txt и запишет в него текст "This is the first note.". Затем добавьте в файл еще одну строку "This is the second note.". После этого прочитайте файл и выведите его содержимое в консоль.

const fs = require("fs");

fs.writeFile("./notes.txt", "This is the first note.", (err) => {
    if (err) console.log(err);
    else {
        fs.appendFile("./notes.txt", "\nThis is the second note.", (err) => {
            if (err) console.log(err);
            else {
                fs.readFile("./notes.txt", "utf-8", (err, data) => {
                    if (err) console.log(err);
                    else console.log(data);
                });
            }
        });
    }
});
