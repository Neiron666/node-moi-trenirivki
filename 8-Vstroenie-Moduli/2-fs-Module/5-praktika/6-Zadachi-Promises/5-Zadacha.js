// Задание 5: Проверка существования файла
// Проверьте, существует ли файл check.txt.
// Если файл существует, переименуйте его в checked.txt.
// Если файла нет, создайте его и запишите в него текст "File was created because it did not exist.".

const fs = require("fs/promises");

fs.access("./check.txt", fs.constants.F_OK)
    .then(() => {
        return fs
            .rename("./check.txt", "checked.txt")
            .then(() => console.log("File was renamed to checked.txt"));
    })
    .catch(() => {
        return fs
            .writeFile(
                "check.txt",
                "File was created because it did not exist."
            )
            .then(() => console.log("File check.txt was created"));
    })
    .catch((err) => console.error("An error occurred:", err));
