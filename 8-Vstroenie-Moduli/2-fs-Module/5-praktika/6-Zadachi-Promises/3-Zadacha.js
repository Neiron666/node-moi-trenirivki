// Задание 3: Удаление файла после чтения
// Прочитайте содержимое файла delete-me.txt.
// После успешного чтения удалите файл.
// В случае ошибки при чтении или удалении выведите сообщение об ошибке в консоль.

const fs = require("fs/promises");

fs.writeFile("./delete-me.txt", "Delete me file content")
    .then(() => console.log("delete-me.txt file was created"))
    .then(() => fs.readFile("./delete-me.txt", "utf-8"))
    .then((data) => console.log(`Content of delete-me.txt file:${data}`))
    .then(() => fs.unlink("./delete-me.txt"))
    .then(() => console.log("delete-me.txt file was deleted"))
    .catch((err) => console.log(err));
