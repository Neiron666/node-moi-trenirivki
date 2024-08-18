// Задача 1: Запись в файл и таймеры
// Создайте программу, которая сначала записывает данные в файл.
// Используйте setTimeout с задержкой 100 мс и process.nextTick.
// Выведите сообщения так, чтобы nextTick сработал сразу после записи в файл, а затем сработал таймер.

const fs = require("fs");

fs.writeFile("./1zadacha.txt", "Hello 1zadacha", () => {
    console.log("File zadacha1 is written");
    process.nextTick(() => console.log("next tick"));
});

setTimeout(() => {
    console.log("Timeout 1");
}, 100);
