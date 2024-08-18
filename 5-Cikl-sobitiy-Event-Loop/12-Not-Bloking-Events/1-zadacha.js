// Задача 1
// Напишите функцию, которая непрерывно выводит в консоль текущее время через console.log в цикле while, пока не пройдет 5 секунд. Используйте setTimeout для остановки цикла и setImmediate для предотвращения блокировки цикла событий.

const fs = require("fs");

let isRunning = true;

setTimeout(() => {
    isRunning = false;
}, 50);

process.nextTick(() => console.log("Next tick"));

function setImidiatePromise() {
    return new Promise((resolve, rejects) => {
        setImmediate(() => {
            resolve(), console.log("resolved");
        });
    });
}

async function whileLoop() {
    while (isRunning) {
        console.log(new Date().toLocaleTimeString(), "while loop");

        await setImidiatePromise();
    }
}

whileLoop().then(() => console.log("Loop is ended"));
