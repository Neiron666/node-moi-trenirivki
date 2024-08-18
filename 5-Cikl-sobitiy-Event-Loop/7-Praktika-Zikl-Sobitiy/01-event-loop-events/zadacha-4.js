// Задача 4: Использование process.nextTick и таймеров
// Описание задачи:

const { nextTick } = require("process");

// Выведите в консоль Start.
// Установите таймер с задержкой 15 мс, который выводит Timer 15ms.
// Используйте process.nextTick, чтобы в следующем цикле событий вывести Next Tick.
// Установите таймер с задержкой 5 мс, который выводит Timer 5ms.
// Выведите в консоль End после установки таймеров и process.nextTick.

console.log("Start");

setTimeout(() => {
    console.log("Timer 5ms");
}, 5);

setTimeout(() => {
    console.log("Timer 15ms");
}, 15);

nextTick(() => console.log("Next Tick"));

setTimeout(() => {
    console.log("End");
}, 20);
