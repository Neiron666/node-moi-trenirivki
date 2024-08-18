// Задача 4: Чтение и запись файла с таймерами
// Описание:

// Выведите в консоль Start Task 4.
// Используйте fs.writeFile для записи строки Hello Task 4 в файл task4.txt. В коллбэке выведите File written Task 4.
// Установите таймер с задержкой 15 мс, который выведет Timer 15ms.
// Внутри коллбэка fs.writeFile создайте setImmediate, который выведет Immediate inside file write.
// Создайте промис, который выполнится через 10 мс и выведет Promise 10ms.
// В конце выведите в консоль End Task 4.

const fs = require("fs");

console.log("Start Task 4");
console.log("End Task 4");

function timeStamp() {
    return performance.now().toFixed(2);
}

fs.writeFile("./task4.txt", "Hello Task 4", () => {
    console.log("File written Task 4");
    setImmediate(() => console.log("Immediate inside file write"));
});

setTimeout(() => {
    console.log("Timer 15ms");
}, 15);

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise 10ms");
    }, 10);
});

promise.then((message) => console.log(message));
