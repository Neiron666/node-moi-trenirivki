// Задача 2: Разные типы асинхронных операций
// Описание:

// Выведите в консоль Begin.
// Создайте таймер с задержкой 20 мс, который выведет Timer 20ms.
// Используйте fs.readFile для чтения несуществующего файла и выведите File read в коллбэке.
// Используйте process.nextTick для вывода Next tick 2.
// Создайте таймер с задержкой 0 мс, который выведет Timer 0ms.
// В коллбэке setImmediate выведите Immediate 2.
// Выведите в консоль Finish.

const fs = require("fs");

const timeStamp = () => {
    return `"timeStamp" ${performance.now().toFixed(2)}`;
};

console.log("Begin", timeStamp());

setTimeout(() => {
    console.log("Timer 20ms", timeStamp());
}, 20);

fs.readFile("./test.txt", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    console.log(data.toString(), timeStamp());
});

process.nextTick(() => console.log("Next tick 2", timeStamp()));

setTimeout(() => {
    console.log("Timer 0ms", timeStamp());
}, 0);

setImmediate(() => console.log("Immediate 2", timeStamp()));

console.log("Finish", timeStamp());
