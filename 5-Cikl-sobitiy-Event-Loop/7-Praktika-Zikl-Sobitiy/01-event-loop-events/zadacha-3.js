// Задача 3: Вложенные таймеры и асинхронные операции
// Описание задачи:

// Выведите в консоль Start.
// Установите таймер с задержкой 30 мс, который выводит Timer 30ms.
// Установите таймер с задержкой 0 мс, который выводит Timer 0ms.
// Выполните асинхронную операцию (например, запись в файл), и в ее коллбэке установите таймер с задержкой 10 мс, который выводит Timer 10ms.
// Выведите в консоль End после установки всех таймеров и асинхронной операции.

const fs = require("fs");

console.log("Start");

setTimeout(() => console.log("Timer 0ms"), 0);
setTimeout(() => console.log("Timer 30ms"), 30);
setTimeout(() => console.log("End"), 40);

fs.writeFile("./test3.txt", "Hi you", () => {
    console.log("file written");
    setTimeout(() => console.log("Timer 10ms inside fs"));
});
