// Задание 4: Перемещение и изменение файлов
// Создайте файл old-directory/file.txt с любым текстом.
// Переместите файл в новый каталог new-directory/.
// Переименуйте файл в новом каталоге в new-file.txt.
// Добавьте новую строку в конец файла.

const fs = require("fs/promises");

fs.mkdir("./old-directory")
    .then(() =>
        fs.writeFile("./old-directory/file.txt", "some text in file.txt")
    )
    .then(() => fs.mkdir("./new-directory"))
    .then(() =>
        fs.rename("./old-directory/file.txt", "./new-directory/file.txt")
    )
    .then(() => fs.appendFile("./new-directory/file.txt", "\nNew string"))
    .then(() => console.log("END"))
    .catch((err) => console.log(err));
