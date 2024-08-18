// Задача 5: Асинхронные операции с разными приоритетами
// Описание:

// Выведите в консоль Task 5 Start.
// Установите process.nextTick для вывода Next tick Task 5.
// Используйте setImmediate для вывода Immediate Task 5.
// Создайте таймер с задержкой 0 мс, который выведет Timer 0ms Task 5.
// Используйте fs.readFile для чтения файла test.txt (предположим, что файл существует) и выведите File read Task 5.
// Создайте промис, который выполнится через 20 мс и выведет Promise 20ms Task 5.
// В конце выведите в консоль Task 5 End.

const fs = require("fs");

console.log("Task 5 Start");
console.log("Task 5 End");

process.nextTick(() => console.log("Next tick Task 5"));

setImmediate(() => console.log("Immediate Task 5"));

setTimeout(() => {
    console.log("Timer 0ms Task 5");
}, 0);

fs.readFile("./test.txt", (err, data) => {
    if (err) throw err;
    console.log("File read Task 5");
});

const promise = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Promise 20ms Task 5");
    }, 20);
});

promise.then((message) => console.log(message));
