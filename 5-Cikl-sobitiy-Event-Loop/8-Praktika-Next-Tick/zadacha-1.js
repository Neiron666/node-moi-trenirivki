// Задача 1: Промисы и таймеры
// Описание:

// Выведите в консоль Start.
// Создайте промис, который выполнится через 15 мс и выведет в консоль Promise 15ms.
// Установите таймер с задержкой 10 мс, который выведет Timer 10ms.
// Установите таймер с задержкой 5 мс, который выведет Timer 5ms.
// Выведите в консоль End.

function timeStamp() {
    return performance.now().toFixed(2);
}

console.log("Start", timeStamp());

setTimeout(() => {
    Promise.resolve().then(() => console.log("Promise 15ms", timeStamp()));
}, 15);

setTimeout(() => console.log("Timer 5ms"), 5);

setTimeout(() => console.log("Timer 10ms"), 10);

setTimeout(() => console.log("End"), 15);
