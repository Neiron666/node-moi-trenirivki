//Задание 5: Напишите скрипт, который сначала создаст файл temp.txt и запишет в него текст "Temporary file". После успешного создания вызовите коллбэк-функцию, которая установит таймер на 5 секунд. После истечения таймера выполните коллбэк, который удалит этот файл, а затем вызовите еще один коллбэк, который проверит, был ли файл успешно удален.

const fs = require("fs");

fs.writeFile("./temp.txt", "Temporary file", (err) => {
    if (err) {
        console.log("Error when try to write temp.txt file", err);
    } else {
        setTimeout(() => {
            fs.unlink("./temp.txt", (err) => {
                if (err) {
                    console.log("Error deleting temp.txt file", err);
                } else {
                    fs.access("./temp.txt", fs.constants.F_OK, (err) => {
                        if (err) {
                            console.log(
                                "file temp.txt was deleted succesfully"
                            );
                        }
                    });
                }
            });
        }, 5000);
    }
});
